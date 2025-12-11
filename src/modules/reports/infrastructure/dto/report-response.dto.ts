// dto/alert-report-response.dto.ts
import { AlertReportOrmEntity } from '../persistence/orm-entities/report.orm-entitiy';

export class AlertReportResponseDto {
	id: number;
	reason: string;
	comments: string | null;
	createdAt: Date;
	updatedAt: Date;

	alert: {
		id: number;
		speciesId: number;
		breedId: number | null;
		description: string;
		latitude: number;
		longitude: number;
		date: Date;
		type: string;
	};

	user: {
		id: number;
		username: string;
		name: string;
		lastName1: string;
		lastName2?: string;
	};

	images: string[];

	constructor(report: AlertReportOrmEntity) {
		this.id = report.id;
		this.reason = report.reason;
		this.comments = report.comments;
		this.createdAt = report.createdAt;
		this.updatedAt = report.updatedAt;

		// --- información de la alerta ---
		this.alert = {
			id: report.alert.id,
			speciesId: report.alert.speciesId,
			breedId: report.alert.breedId,
			description: report.alert.description,
			latitude: report.alert.latitude,
			longitude: report.alert.longitude,
			date: report.alert.date,
			type: report.alert.type
		};

		// --- información del usuario (sin password ni docNumber) ---
		this.user = {
			id: report.user.id,
			username: report.user.username,
			name: report.user.name,
			lastName1: report.user.lastName1,
			lastName2: report.user.lastName2
		};

		// --- URLs de las imágenes ---
		this.images = report.images?.map(img => img.url) || [];
	}
}
