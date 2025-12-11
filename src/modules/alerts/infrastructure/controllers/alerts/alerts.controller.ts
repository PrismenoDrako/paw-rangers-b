import { Body, Controller, Post, UploadedFiles, UseInterceptors, Request, Put, Param, Get, UseGuards, Inject } from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { CreateAlertDto } from '../../dto/create-alert.dto';
import { UpdateAlertDto } from '../../dto/update-alert.dto';
import { AlertResponseDto } from '../../dto/alert-response.dto';
import { StorageService } from '../../../../storage/storage.service';
import { AlertService } from '../../services/alerts.service';
import { JwtAuthGuard } from '../../../../auth/jwt/jwt.guard';
import { InjectRepository } from '@nestjs/typeorm';
import { AlertStateOrmEntity } from '../../persistence/orm-entities/alert-state.orm-entity';
import { Repository } from 'typeorm';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AlertOrmEntity } from '../../persistence/orm-entities/alert.orm-entity';
import { AlertDetailResponseDto } from '../../dto/alert-detail-response.dto';

@Controller('alerts')
export class AlertsController {

    constructor(
        private readonly alertService: AlertService,
        private readonly storageService: StorageService,
        @InjectRepository(AlertStateOrmEntity)
        private readonly alertStateRepository: Repository<AlertStateOrmEntity>,
    ) { }


    @UseGuards(JwtAuthGuard)
    @Get()
    async findAllByUser(
        @Request() req,
        @Param('page') page: number = 1
    ): Promise<AlertResponseDto[]> {
        const alerts = await this.alertService.findNearbyAlerts(req.user.userId, page);
        return alerts.map(alert => new AlertResponseDto(alert));
    }

    // ------------------ CREAR ALERTA ------------------
    @UseGuards(JwtAuthGuard)
    @Post()
    @UseInterceptors(FileFieldsInterceptor([{ name: 'images', maxCount: 5 }]))
    async create(
        @Body() dto: CreateAlertDto,
        @UploadedFiles() files: { images?: Express.Multer.File[] },
        @Request() req
    ): Promise<AlertResponseDto> {

        const state = await this.alertStateRepository.findOne({ where: { name: 'ACTIVE' } });
        dto.userId = req.user.userId;
        dto.stateId = state!.id;

        // Subir archivos a MinIO
        const imageUrls = files.images
            ? await this.storageService.uploadFiles(files.images, 'alerts')
            : [];

        // Crear alerta en el servicio
        const alert = await this.alertService.create(dto, imageUrls);

        // Mapear a DTO de respuesta
        return new AlertResponseDto(alert);
    }

    // ------------------ ACTUALIZAR ALERTA ------------------
    @Put(':id')
    @UseInterceptors(FileFieldsInterceptor([{ name: 'images', maxCount: 5 }]))
    async update(
        @Param('id') id: string,
        @Body() dto: UpdateAlertDto,
        @UploadedFiles() files: { images?: Express.Multer.File[] },
        @Request() req
    ): Promise<AlertResponseDto> {
        // Subir nuevas imágenes si se enviaron
        const imageUrls = files.images
            ? await this.storageService.uploadFiles(files.images, 'alerts')
            : [];

        // Actualizar alerta en el servicio
        const alert = await this.alertService.update(Number(id), dto, imageUrls);

        // Mapear a DTO de respuesta
        return new AlertResponseDto(alert);
    }


    @UseGuards(JwtAuthGuard)
    @Get(':id')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Obtener detalle completo de una alerta por ID' })
    @ApiResponse({ status: 200, description: 'Alerta encontrada', type: AlertDetailResponseDto })
    @ApiResponse({ status: 404, description: 'Alerta no encontrada' })
    async findOne(@Param('id') id: string): Promise<AlertDetailResponseDto> {
        const alert = await this.alertService.findById(Number(id));
        return new AlertDetailResponseDto(alert);
    }

    
}
