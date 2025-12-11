import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AlertReportOrmEntity } from '../../persistence/orm-entities/report.orm-entitiy';
import { Repository } from 'typeorm';
import { StorageService } from '../../../../storage/storage.service';
import { AlertReportImageOrmEntity } from '../../persistence/orm-entities/report-image.orm-entity';
import { CreateReportDto } from '../../dto/create-report.dto';

@Injectable()
export class ReportsService {
    constructor(
        @InjectRepository(AlertReportOrmEntity)
        private readonly reportRepository: Repository<AlertReportOrmEntity>,
        @InjectRepository(AlertReportImageOrmEntity)
        private readonly reportImageRepository: Repository<AlertReportImageOrmEntity>,
        private readonly storageService: StorageService
    ){}


    async createReport(
	dto: CreateReportDto,
	userId: number,
	images: Express.Multer.File[]
) {
	// 1. Crear instancia básica del reporte
	const report = this.reportRepository.create({
		alertId: dto.alertId,
		userId: userId,
		reason: dto.reason,
		comments: dto.comments ?? null,
		images: [] // se llenará más adelante
	});

	// 2. Si hay imágenes → subirlas
	if (images && images.length > 0) {
		const urls = await this.storageService.uploadFiles(images, 'alert-reports');

		report.images = urls.map(url => {
			const img = new AlertReportImageOrmEntity();
			img.url = url;
			return img;
		});
	}

	// 3. Guardar todo en la BD (gracias a cascade en images)
	const saved = await this.reportRepository.save(report);

	return saved;
}

}
