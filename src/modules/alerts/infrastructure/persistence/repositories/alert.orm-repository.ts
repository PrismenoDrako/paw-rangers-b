import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { AlertRepository } from "../../../domain/repositories/alert.repository";
import { Alert } from "../../../domain/entities/alert.entity";
import { AlertType } from "../../../domain/entities/alert-type.enum";

import { AlertOrmEntity } from "../orm-entities/alert.orm-entity";
import { AlertImageOrmEntity } from "../orm-entities/alert-image.orm-entity";

import { AlertMapper } from "../mappers/alert.mapper";

export class AlertOrmRepository extends AlertRepository {

    constructor(
        @InjectRepository(AlertOrmEntity)
        private readonly alertRepo: Repository<AlertOrmEntity>,

        @InjectRepository(AlertImageOrmEntity)
        private readonly imageRepo: Repository<AlertImageOrmEntity>
    ) {
        super();
    }

    // ---------------------------------------------------------
    // CRUD BÁSICO
    // ---------------------------------------------------------

    async save(alert: Alert): Promise<Alert> {
        const orm = AlertMapper.toOrmEntity(alert);

        // Para evitar borrar imágenes si no llegaron en esta actualización
        if (alert.images && alert.images.length > 0) {
            orm.images = alert.images.map(img => ({
                id: img.id,
                url: img.url,
            })) as any;
        }

        const saved = await this.alertRepo.save(orm);
        return AlertMapper.toDomain(saved);
    }

    async findById(id: number): Promise<Alert | null> {
        const found = await this.alertRepo.findOne({
            where: { id },
            relations: ["images", "user", "species", "breed", "state"],
        });

        return found ? AlertMapper.toDomain(found) : null;
    }

    async findAll(): Promise<Alert[]> {
        const list = await this.alertRepo.find({
            relations: ["images", "user", "species", "breed", "state"],
        });
        return list.map(AlertMapper.toDomain);
    }

    async delete(id: number): Promise<void> {
        await this.alertRepo.delete(id);
    }

    // ---------------------------------------------------------
    // FILTROS ESPECIALIZADOS
    // ---------------------------------------------------------

    async findBySpecies(speciesId: number): Promise<Alert[]> {
        const res = await this.alertRepo.find({
            where: { speciesId },
            relations: ["images"],
        });
        return res.map(AlertMapper.toDomain);
    }

    async findByBreed(breedId: number): Promise<Alert[]> {
        const res = await this.alertRepo.find({
            where: { breedId },
            relations: ["images"],
        });
        return res.map(AlertMapper.toDomain);
    }

    async findByUserId(userId: number): Promise<Alert[]> {
        const res = await this.alertRepo.find({
            where: { userId  },
            relations: ["images"],
        });
        return res.map(AlertMapper.toDomain);
    }

    async findByType(type: AlertType): Promise<Alert[]> {
        const res = await this.alertRepo.find({
            where: { type },
            relations: ["images"],
        });
        return res.map(AlertMapper.toDomain);
    }

    async findByState(stateId: number): Promise<Alert[]> {
        const res = await this.alertRepo.find({
            where: { state: { id: stateId } },
            relations: ["images"],
        });
        return res.map(AlertMapper.toDomain);
    }

    // ---------------------------------------------------------
    // GEOLOCALIZACIÓN (SIN POSTGIS)
    // ---------------------------------------------------------
    /**
     * Distancia Haversine expresada en SQL puro.
     */
    private getHaversineSql(lat: number, lng: number) {
        return `
            (6371000 * acos(
                cos(radians(${lat}))
                * cos(radians(alert.latitude))
                * cos(radians(alert.longitude) - radians(${lng}))
                + sin(radians(${lat})) * sin(radians(alert.latitude))
            ))
        `;
    }

    async findNearbyForUserId(
        userId: number,
        radius: number,
        includeOwnAlerts: boolean = false
    ): Promise<Alert[]> {

        // 1. obtener ubicaciones del usuario
        const userLocations = await this.alertRepo.manager
            .createQueryBuilder("user_locations", "ul")
            .where("ul.user_id = :userId", { userId })
            .getRawMany();

        if (userLocations.length === 0) return [];

        const qb = this.alertRepo.createQueryBuilder("alert")
            .leftJoinAndSelect("alert.images", "images");

        if (!includeOwnAlerts) {
            qb.andWhere("alert.user_id != :userId", { userId });
        }

        // Construcción dinámica OR por cada ubicación del usuario
        const distanceClauses = userLocations.map((loc, idx) => {
            const dSql = this.getHaversineSql(loc.latitude, loc.longitude);
            return `${dSql} <= :radius${idx}`;
        });

        qb.andWhere(distanceClauses.join(" OR "));

        // Parámetros de radios
        userLocations.forEach((loc, idx) => {
            qb.setParameter(`radius${idx}`, radius);
        });

        const results = await qb.getMany();
        return results.map(AlertMapper.toDomain);
    }

    // ---------------------------------------------------------
    // SEARCH AVANZADO
    // ---------------------------------------------------------
    async search(params: {
        speciesId?: number;
        breedId?: number;
        userId?: number;
        stateId?: number;
        type?: AlertType;
        fromDate?: Date;
        toDate?: Date;
        latitude?: number;
        longitude?: number;
        radius?: number;
    }): Promise<Alert[]> {

        const qb = this.alertRepo.createQueryBuilder("alert")
            .leftJoinAndSelect("alert.images", "images");

        if (params.speciesId) qb.andWhere("alert.species_id = :sid", { sid: params.speciesId });
        if (params.breedId) qb.andWhere("alert.breed_id = :bid", { bid: params.breedId });
        if (params.userId) qb.andWhere("alert.user_id = :uid", { uid: params.userId });
        if (params.stateId) qb.andWhere("alert.state_id = :state", { state: params.stateId });
        if (params.type) qb.andWhere("alert.type = :type", { type: params.type });
        if (params.fromDate) qb.andWhere("alert.created_at >= :from", { from: params.fromDate });
        if (params.toDate) qb.andWhere("alert.created_at <= :to", { to: params.toDate });

        // Distancia por Haversine
        if (params.latitude && params.longitude && params.radius) {
            const dSql = this.getHaversineSql(params.latitude, params.longitude);
            qb.andWhere(`${dSql} <= :r`, { r: params.radius });
        }

        const results = await qb.getMany();
        return results.map(AlertMapper.toDomain);
    }
}
