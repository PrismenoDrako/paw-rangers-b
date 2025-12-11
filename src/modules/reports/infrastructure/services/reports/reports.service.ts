import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AlertReportOrmEntity } from '../../persistence/orm-entities/report.orm-entitiy';
import { Repository } from 'typeorm';
import { StorageService } from '../../../../storage/storage.service';
import { AlertReportImageOrmEntity } from '../../persistence/orm-entities/report-image.orm-entity';
import { CreateReportDto } from '../../dto/create-report.dto';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { AlertReportResponseDto } from '../../dto/report-response.dto';

@Injectable()
export class ReportsService {
	constructor(
		@InjectRepository(AlertReportOrmEntity)
		private readonly reportRepository: Repository<AlertReportOrmEntity>,
		@InjectRepository(AlertReportImageOrmEntity)
		private readonly reportImageRepository: Repository<AlertReportImageOrmEntity>,
		private readonly storageService: StorageService,
		@InjectQueue('notifications')
		private readonly notificationsQueue: Queue, //inyectamos la cola
	) { }


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


		// Crear job asíncrono para notificar al creador de la alerta
		await this.notificationsQueue.add('report-alert', {
			reportId: saved.id,
			alertId: dto.alertId,
			reporterId: userId,
		});

		return saved;
	}

	async getReportById(reportId: number): Promise<AlertReportResponseDto | null> {
		const report = await this.reportRepository.findOne({
			where: { id: reportId },
			relations: ['user', 'alert', 'images'],
		});

		if (!report) return null;

		return new AlertReportResponseDto(report);
	}


}
