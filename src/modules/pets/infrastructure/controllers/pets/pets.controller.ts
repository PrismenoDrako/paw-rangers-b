import { Body, Controller, Post, UploadedFiles, UseGuards, UseInterceptors, Request } from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { CreatePetUseCase } from '../../../application/use-cases/pet/create-pet.use-case';
import { Pet } from '../../../domain/entities/pet.entity';
import { CreatePetDto } from '../../../application/dto/create-pet.dto';
import { JwtAuthGuard } from '../../../../auth/jwt/jwt.guard';

@Controller('pets')
export class PetsController {

    constructor(private readonly createPetUseCase: CreatePetUseCase) {}


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
        const userId = req.user.id;
        dto.userId = userId;
        return this.createPetUseCase.execute(dto, uploadedFiles);
    }
}
