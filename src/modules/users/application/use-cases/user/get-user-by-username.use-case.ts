import { Inject } from "@nestjs/common";
import { IUserRepository } from "../../../domain/repositories/user.repository";
import { User } from "../../../domain/entities/user.entity";

export class GetUserByUsernameUseCase {

    constructor(@Inject(IUserRepository)
    private readonly userRepository: IUserRepository) { }

    /**
     * Devuelve una lista completa de tipos de documento.
     */
    async execute(username: string): Promise<User> {
        return await this.userRepository.findByUsername(username);
    }
}
