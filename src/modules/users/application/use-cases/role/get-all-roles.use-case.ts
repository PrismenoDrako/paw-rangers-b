import { Inject } from "@nestjs/common";
import { IRoleRepository } from "../../../domain/repositories/role.repository";
import { Role } from "../../../domain/entities/role.entity";

export class GetAllRolesUseCase {
    constructor(
        @Inject(IRoleRepository)
        private readonly roleRepository: IRoleRepository
    ) { }

    /**
     * Devuelve una lista completa de tipos de documento.
     */
    async execute(): Promise<Role[]> {
        return await this.roleRepository.findAll();
    }
}