import { Inject } from "@nestjs/common";
import { User } from "../../../domain/entities/user.entity";
import { UpdateUserDto } from "../../dto/user/update-user.dto";
import { IUserRepository } from "../../../domain/repositories/user.repository";


export class UpdateUserUseCase {
    constructor(@Inject(IUserRepository)
    private readonly userRepository: IUserRepository) { }

    async execute(id: number, dto: UpdateUserDto): Promise<User> {

        const existing = await this.userRepository.findById(id);
        if (!existing) {
            throw new Error(`No se encontró el tipo de documento con id ${id}`);
        }

        const updated = new User(
            existing.id,
            existing.username,
            existing.password,
            existing.email,
            dto.name ?? existing.name,
            dto.lastName1 ??existing.lastName1,
            dto.lastName2 ?? existing.lastName2,
            dto.docTypeId ?? existing.docTypeId,
            existing.docNumber,
            dto.address ?? existing.address,
            dto.roleId ?? existing.roleId,
            existing.isActive
        );

        return await this.userRepository.save(updated);
    }
}