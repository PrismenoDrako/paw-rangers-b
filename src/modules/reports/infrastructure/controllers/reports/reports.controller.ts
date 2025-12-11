import {
	Controller,
	Post,
	Body,
	UploadedFiles,
	UseInterceptors,
	Req,
	UseGuards
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiOperation, ApiConsumes, ApiBody } from '@nestjs/swagger';

import { ReportsService } from '../../services/reports/reports.service';
import { CreateReportDto } from '../../dto/create-report.dto';
import { JwtAuthGuard } from '../../../../../modules/auth/jwt/jwt.guard';

@ApiTags('Reports')
@Controller('reports')
@UseGuards(JwtAuthGuard)
export class ReportsController {
	constructor(private readonly reportsService: ReportsService) {}

	@Post()
	@ApiOperation({ summary: 'Crear un reporte sobre una alerta' })
	@ApiConsumes('multipart/form-data')
	@ApiBody({
		schema: {
			type: 'object',
			properties: {
				alertId: { type: 'number', example: 12 },
				reason: { type: 'string', example: 'Información falsa' },
				comments: { type: 'string', example: 'El perro no coincide con la foto', nullable: true },
				images: {
					type: 'array',
					items: {
						type: 'string',
						format: 'binary'
					}
				}
			}
		}
	})
	@UseInterceptors(FilesInterceptor('images'))
	async createReport(
		@Body() dto: CreateReportDto,
		@UploadedFiles() images: Express.Multer.File[],
		@Req() req
	) {
		const userId = req.user.userId;

		return this.reportsService.createReport(dto, userId, images);
	}
}
