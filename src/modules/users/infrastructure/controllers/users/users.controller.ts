import { Body, Controller, Get, Param, Patch, Put } from '@nestjs/common';
import { GetAllUsersUseCase } from '../../../application/use-cases/user/get-all.users.use-case';
import { ApiResponseDto } from '../../../../shared/infrastructure/api-response';
import { User } from '../../../domain/entities/user.entity';
import type { UpdateUserDto } from '../../../../users/application/dto/user/update-user.dto';
import { UpdateUserUseCase } from '../../../application/use-cases/user/update-user.use-case';

/**
 * Controlador para los endpoints de usuarios.
 */
@Controller('users')
export class UsersController {

    constructor(
        private readonly getAllUsersUseCase: GetAllUsersUseCase,
        private readonly updateUserUseCase: UpdateUserUseCase
    ){}

    @Get()
    async getAll(){
        const users: User[] = await this.getAllUsersUseCase.execute();
        return new ApiResponseDto({ status: 'success', data: users });
    }

    @Put(':id')
	async update(@Param('id') id: number, @Body() dto: UpdateUserDto) {
		const updatedUser = await this.updateUserUseCase.execute(id, dto);
		return updatedUser;
	}
}
