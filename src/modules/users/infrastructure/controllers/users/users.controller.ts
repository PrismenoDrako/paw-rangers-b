import { Body, Controller, Get, Param, Patch, Post, Put, Req, UseGuards } from '@nestjs/common';
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
import { JwtAuthGuard } from '../../../../auth/jwt/jwt.guard';
import { UsersService } from '../../services/users.service';
import { UserOrmEntity } from '../../persistence/orm-entities/user.orm-entity';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UpdateUserDto_ } from '../../dto/update-user.dto';

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
        private readonly userService: UsersService
    ) { }

    @Get()
    @ApiOperation({ summary: 'Obtener todos los usuarios' })
    @ApiResponse({ status: 200, description: 'Lista de usuarios', type: [User] })
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

    @UseGuards(JwtAuthGuard)
    @Patch('me')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Actualizar los propios datos del usuario autenticado' })
    @ApiBody({
        type: UpdateUserDto_,
        examples: {
            fullUpdate: {
                summary: 'Actualizar todos los campos editables',
                value: {
                    name: 'Juan',
                    lastName1: 'Pérez',
                    lastName2: 'García',
                    docTypeId: 2,
                    docNumber: '12345678',
                    address: 'Av. Siempre Viva 123',
                    phone: '999888777'
                }
            },
            partialUpdate: {
                summary: 'Actualizar solo nombre y dirección',
                value: {
                    name: 'María',
                    address: 'Calle Falsa 456'
                }
            }
        }
    })
    @ApiResponse({ status: 200, description: 'Usuario actualizado', type: UserOrmEntity })
    async updateOwnUser(
        @Req() req,
        @Body() updateData: UpdateUserDto,
    ): Promise<UserOrmEntity> {
        const userId = req.user.userId;
        return this.userService.updateOwnUser(userId, updateData);
    }

}
