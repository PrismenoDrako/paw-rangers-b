import { Injectable } from "@nestjs/common";
import { UserLocationRepository } from "../../domain/repositories/user-location.repository";
import { UserLocation } from "../../domain/entities/user-location.entity";

/**
 * Caso de uso para obtener las ubicaciones frecuentes de un usuario.
 */
@Injectable()
export class GetUserLocationsUseCase {
    constructor(
        private readonly repository: UserLocationRepository
    ) {}

    /**
     * Ejecuta el caso de uso.
     * @param userId Identificador del usuario
     */
    async execute(userId: number): Promise<UserLocation[]> {
        return this.repository.findByUserId(userId);
    }
}