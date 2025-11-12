import { Controller, Get } from '@nestjs/common';
import { Role } from '../../../domain/entities/role.entity';
import { ApiResponseDto } from '../../../../shared/infrastructure/api-response';
import { GetAllRolesUseCase } from '../../../application/use-cases/role/get-all-roles.use-case';


@Controller('roles')
export class RolesController {

    constructor(
        private readonly getAllRolesUseCase: GetAllRolesUseCase,
    ) { }

    @Get()
    async getAll() {
        const roles: Role[] = await this.getAllRolesUseCase.execute();
        return new ApiResponseDto({ status: 'success', data: roles });
    }

}
