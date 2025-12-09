import { Alert } from '../../../domain/entities/alert.entity';
import { AlertOrmEntity } from '../orm-entities/alert.orm-entity';
import { AlertImageMapper } from './alert-image.mapper';

export class AlertMapper {

    static toDomain(entity: AlertOrmEntity): Alert {

        return {
            id: entity.id,
            speciesId: entity.speciesId,
            breedId: entity.breedId,
            description: entity.description,
            latitude: Number(entity.latitude),
            longitude: Number(entity.longitude),
            date: entity.date,
            userId: entity.userId,
            stateId: entity.stateId,
            type: entity.type,
            createdAt: entity.createdAt,
            updatedAt: entity.updatedAt,

            // imágenes si están cargadas
            images: entity.images?.map(img => AlertImageMapper.toDomain(img)) ?? []
        };
    }

    static toOrmEntity(domain: Alert): AlertOrmEntity {
        const orm = new AlertOrmEntity();

        orm.id = domain.id;
        orm.speciesId = domain.speciesId;
        orm.breedId = domain.breedId;
        orm.description = domain.description;
        orm.latitude = domain.latitude;
        orm.longitude = domain.longitude;
        orm.date = domain.date;
        orm.userId = domain.userId;
        orm.stateId = domain.stateId;
        orm.type = domain.type;
        orm.createdAt = domain.createdAt;
        orm.updatedAt = domain.updatedAt;

        // si el dominio trae imágenes, mapearlas
        if (domain.images) {
            orm.images = domain.images.map(img => AlertImageMapper.toOrm(img));
        }

        return orm;
    }
}
