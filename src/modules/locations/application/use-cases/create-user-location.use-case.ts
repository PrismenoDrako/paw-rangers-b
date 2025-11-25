import { Injectable } from "@nestjs/common";
import { UserLocationRepository } from "../../domain/repositories/user-location.repository";
import { CreateUserLocationDto } from "../dto/create-user-location.dto";
import { UserLocation } from "../../domain/entities/user-location.entity";

/**
 * Caso de uso para crear una ubicación frecuente para un usuario.
 */
@Injectable()
export class CreateUserLocationUseCase {
    constructor(
        private readonly repository: UserLocationRepository
    ) {}

    /**
     * Ejecuta el caso de uso.
     * @param userId Usuario propietario
     * @param dto Datos de la ubicación a registrar
     */
    async execute(userId: number, dto: CreateUserLocationDto): Promise<UserLocation> {
        const location = new UserLocation({
            userId,
            name: dto.name,
            latitude: dto.latitude,
            longitude: dto.longitude,
            radius: dto.radius,
        });
        return this.repository.create(location);
    }
}