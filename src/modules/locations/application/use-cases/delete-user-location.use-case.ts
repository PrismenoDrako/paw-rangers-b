import { Injectable } from "@nestjs/common";
import { UserLocationRepository } from "../../domain/repositories/user-location.repository";

/**
 * Caso de uso para eliminar una ubicación frecuente de un usuario.
 */
@Injectable()
export class DeleteUserLocationUseCase {
    constructor(
        private readonly repository: UserLocationRepository
    ) {}

    /**
     * Ejecuta el caso de uso.
     * @param userId Usuario propietario
     * @param id ID de la ubicación
     */
    async execute(userId: number, id: number): Promise<boolean> {
        return await this.repository.delete(id, userId);
    }
}