import { Inject } from "@nestjs/common";
import { IUserRepository } from "../../../domain/repositories/user.repository";
import { User } from "../../../domain/entities/user.entity";

export class GetUserByUsernameUseCase {

    constructor(@Inject(IUserRepository)
    private readonly userRepository: IUserRepository) { }

    /**
     * Devuelve el usuario asociado al nombre de usuario proporcionado.
     *
     * @param username Nombre de usuario único.
     * @returns La entidad `User` encontrada o `null` si no existe.
     */
    async execute(username: string): Promise<User> {
        return await this.userRepository.findByUsername(username);
    }
}
