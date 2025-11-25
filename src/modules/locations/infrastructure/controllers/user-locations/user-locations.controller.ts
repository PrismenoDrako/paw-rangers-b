import { Body, Controller, Delete, Get, Param, Post, Request, UseGuards } from '@nestjs/common';
import { ApiResponseDto } from '../../../../shared/infrastructure/api-response';
import { JwtAuthGuard } from '../../../../auth/jwt/jwt.guard';
import { GetUserLocationsUseCase } from '../../../application/use-cases/get-user-locations.use-case';
import { CreateUserLocationDto } from '../../../../locations/application/dto/create-user-location.dto';
import { CreateUserLocationUseCase } from '../../../application/use-cases/create-user-location.use-case';
import { DeleteUserLocationUseCase } from '../../../application/use-cases/delete-user-location.use-case';

@Controller('user-locations')
export class UserLocationsController {

    constructor(
        private readonly getUserLocationsUseCase: GetUserLocationsUseCase,
        private readonly createUserLocationUseCase: CreateUserLocationUseCase,
        private readonly deleteUserLocationUseCase: DeleteUserLocationUseCase,
    ) { }

    @UseGuards(JwtAuthGuard)
    @Get()
    async getAllByUser(
        @Request() req
    ) {
        const userLocations = await this.getUserLocationsUseCase.execute(req.user.id);
        return new ApiResponseDto({ status: 'success', data: userLocations });
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    async create(
        @Request() req,
        @Body() body: CreateUserLocationDto
    ) {
        const userId = req.user.userId;
        
        const locationSaved = await this.createUserLocationUseCase.execute(userId, body);
        return new ApiResponseDto({ status: 'success', data: locationSaved });
    }


    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async delete(@Request() req, @Param('id') id: number) {
        const result = await this.deleteUserLocationUseCase.execute(req.user.userId, id);
        return new ApiResponseDto({ status: 'success', data: result });
    }


}
