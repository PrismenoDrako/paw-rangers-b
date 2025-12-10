import { Body, Controller, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { GetAllUsersUseCase } from '../../../application/use-cases/user/get-all.users.use-case';
import { ApiResponseDto } from '../../../../shared/infrastructure/api-response';
import { User } from '../../../domain/entities/user.entity';
import type { UpdateUserDto } from '../../../../users/application/dto/user/update-user.dto';
import { UpdateUserUseCase } from '../../../application/use-cases/user/update-user.use-case';
import { CreateUserDto } from '../../dto/create-user.dto';
import { Password } from '../../../domain/value-objects/password.vo';
import { Email } from '../../../domain/value-objects/email.vo';
import { BcryptPasswordHasher } from '../../services/hasher.service';
import { UserRepository } from '../../persistence/repositories/user.repository';

/**
 * Controlador para los endpoints de usuarios.
 */
@Controller('users')
export class UsersController {

    constructor(
        private readonly getAllUsersUseCase: GetAllUsersUseCase,
        private readonly updateUserUseCase: UpdateUserUseCase,
        private readonly hasher: BcryptPasswordHasher,
        private readonly userRepo: UserRepository,
    ) { }

    @Get()
    async getAll() {
        const users: User[] = await this.getAllUsersUseCase.execute();
        return new ApiResponseDto({ status: 'success', data: users });
    }

    @Put(':id')
    async update(@Param('id') id: number, @Body() dto: UpdateUserDto) {
        const updatedUser = await this.updateUserUseCase.execute(id, dto);
        return updatedUser;
    }

    // Registro público
    @Post('register')
    async register(@Body() dto: CreateUserDto): Promise<User> {
        // Genera hash con bcrypt
        const hash = await this.hasher.hash(dto.password);
        const password = Password.fromHash(hash);

        const defaultRole = await this.userRepo.getDefaultRole();

        const user = new User(
            0,
            dto.username,
            password,
            Email.create(dto.email),
            dto.name,
            dto.lastName1,
            dto.lastName2,
            dto.docTypeId,
            dto.docNumber,
            dto.address,
            defaultRole.id, // rol por defecto
            true
        );

        return this.userRepo.save(user);
    }

}
