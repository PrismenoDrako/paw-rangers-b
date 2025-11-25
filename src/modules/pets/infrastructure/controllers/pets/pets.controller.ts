import { Body, Controller, Post, UploadedFiles, UseGuards, UseInterceptors, Request, Get } from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { CreatePetUseCase } from '../../../application/use-cases/pet/create-pet.use-case';
import { Pet } from '../../../domain/entities/pet.entity';
import { CreatePetDto } from '../../../application/dto/create-pet.dto';
import { JwtAuthGuard } from '../../../../auth/jwt/jwt.guard';
import { GetPetsByUserUseCase } from '../../../application/use-cases/pet/get-pets-by-user.use-case';
import { ApiResponseDto } from '../../../../shared/infrastructure/api-response';

@Controller('pets')
export class PetsController {

    constructor(
        private readonly createPetUseCase: CreatePetUseCase,
        private readonly getPetsByUserUseCase: GetPetsByUserUseCase
    ) {}


    @UseGuards(JwtAuthGuard)
    @Post()
    @UseInterceptors(FileFieldsInterceptor([
        { name: 'images', maxCount: 5 }  // máximo 5 imágenes por mascota
    ]))
    async create(
        @Body() dto: CreatePetDto,
        @UploadedFiles() files: { images?: Express.Multer.File[] },
        @Request() req
    ): Promise<Pet> {
        const uploadedFiles = files.images || [];
        const userId = req.user.userId;
        dto.userId = userId;
        return this.createPetUseCase.execute(dto, uploadedFiles);
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    async findAll(
        @Request() req
    ): Promise<ApiResponseDto<Pet[]>> {
        const userId = req.user.id;
        const pets: Pet[] = await this.getPetsByUserUseCase.execute(userId);
        return new ApiResponseDto({ status: 'success', data: pets });
    }
}
