import { Injectable, NotFoundException } from '@nestjs/common';
import { AlertRepository } from '../../domain/repositories/alert.repository';
import { Alert } from '../../domain/entities/alert.entity';
import { CreateAlertDto } from '../dto/create-alert.dto';
import { UpdateAlertDto } from '../dto/update-alert.dto';
import { AlertImage } from '../../domain/entities/alert-image.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { AlertOrmEntity } from '../persistence/orm-entities/alert.orm-entity';
import { Repository } from 'typeorm';
import { UserLocationOrmEntity } from '../../../locations/infrastructure/persistence/orm-entities/user-location.orm.entity';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';

@Injectable()
export class AlertService {
    constructor(
        private readonly alertRepository: AlertRepository,
        @InjectRepository(AlertOrmEntity)
        private readonly alertRepository_: Repository<AlertOrmEntity>,

        @InjectRepository(UserLocationOrmEntity)
        private readonly userLocationRepository: Repository<UserLocationOrmEntity>,
        @InjectQueue('notifications')
        private readonly notificationsQueue: Queue,
    ) { }



    /**
     * Busca alertas cercanas a las ubicaciones frecuentes del usuario.
     * @param userId Id del usuario autenticado
     * @param page Número de página (empieza en 1)
     */
    async findNearbyAlerts(userId: number, page: number = 1): Promise<AlertOrmEntity[]> {
        const take = 10;
        const skip = (page - 1) * take;

        // Obtener todas las ubicaciones del usuario
        const userLocations = await this.userLocationRepository.find({ where: { user: { id: userId } } });

        // Si no hay ubicaciones frecuentes, devolvemos todas las alertas paginadas
        if (!userLocations.length) {
            return this.alertRepository_.find({
                skip,
                take,
                order: { date: 'DESC' },
                relations: ['images', 'species', 'breed', 'user', 'state'],
            });
        }

        // Creamos la condición Haversine para cada ubicación
        const query = this.alertRepository_.createQueryBuilder('alert');

        // JOINs para traer relaciones necesarias
        query.leftJoinAndSelect('alert.images', 'images')
            .leftJoinAndSelect('alert.species', 'species')
            .leftJoinAndSelect('alert.breed', 'breed')
            .leftJoinAndSelect('alert.user', 'user')
            .leftJoinAndSelect('alert.state', 'state');

        // Creamos un WHERE dinámico que verifica distancia para al menos una ubicación
        const distanceConditions = userLocations.map((loc, index) => {
            return `(6371000 * acos(
                        cos(radians(:lat${index})) * cos(radians(alert.latitude)) *
                        cos(radians(alert.longitude) - radians(:lng${index})) +
                        sin(radians(:lat${index})) * sin(radians(alert.latitude))
                    ) <= :radius${index})`;
        });

        query.where(distanceConditions.join(' OR '));

        // Agregamos parámetros dinámicos
        userLocations.forEach((loc, index) => {
            query.setParameter(`lat${index}`, loc.latitude);
            query.setParameter(`lng${index}`, loc.longitude);
            query.setParameter(`radius${index}`, loc.radius || 5000); // fallback 5km
        });

        query.skip(skip).take(take).orderBy('alert.date', 'DESC');

        return query.getMany();
    }


    /**
     * Obtiene el detalle completo de una alerta por su ID.
     * @param id ID de la alerta
     * @returns Alerta con todas sus relaciones
     * @throws NotFoundException si no existe la alerta
     */
    async findById(id: number): Promise<AlertOrmEntity> {
        const alert = await this.alertRepository_.findOne({
            where: { id },
            relations: ['images', 'species', 'breed', 'user', 'state'],
        });

        if (!alert) {
            throw new NotFoundException(`Alert with id ${id} not found`);
        }

        return alert;
    }

    async findAll(): Promise<Alert[]> {
        return this.alertRepository.findAll();
    }

    // ------------------ CREAR ALERTA ------------------
    async create(dto: CreateAlertDto, imageUrls: string[]): Promise<Alert> {
        // Construir entidad de dominio
        const alert = new Alert();
        Object.assign(alert, dto);

        // Asociar imágenes si hay
        if (imageUrls && imageUrls.length > 0) {
            alert.images = imageUrls.map(url => {
                const img = new AlertImage();
                img.url = url;
                return img;
            });
        }

        const saved = await this.alertRepository.save(alert);

        //Crear el job para procesar notificaciones
        await this.notificationsQueue.add('process-alert', {
            alertId: saved.id,
        });

        return saved;
    }

    // ------------------ ACTUALIZAR ALERTA ------------------
    async update(id: number, dto: UpdateAlertDto, imageUrls: string[]): Promise<Alert> {
        const existing = await this.alertRepository.findById(id);
        if (!existing) throw new NotFoundException(`Alert with id ${id} not found`);

        // Actualizar campos
        Object.assign(existing, dto);

        // Agregar nuevas imágenes si hay
        if (imageUrls && imageUrls.length > 0) {
            const newImages = imageUrls.map(url => {
                const img = new AlertImage();
                img.url = url;
                return img;
            });
            existing.images = [...(existing.images || []), ...newImages];
        }

        // Guardar usando el repository
        return this.alertRepository.save(existing);
    }
}
