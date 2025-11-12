import { Inject } from "@nestjs/common";
import { IUserRepository } from "../../../domain/repositories/user.repository";
import { User } from "../../../domain/entities/user.entity";

export class GetAllUsersUseCase {

    constructor(@Inject(IUserRepository)
    private readonly userRepository: IUserRepository) { }

    /**
     * Devuelve una lista completa de tipos de documento.
     */
    async execute(): Promise<User[]> {
        return await this.userRepository.findAll();
    }
}


