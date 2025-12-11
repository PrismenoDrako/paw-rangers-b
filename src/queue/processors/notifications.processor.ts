import { Processor, WorkerHost } from '@nestjs/bullmq';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AlertOrmEntity } from '../../modules/alerts/infrastructure/persistence/orm-entities/alert.orm-entity';
import { UserLocationOrmEntity } from '../../modules/locations/infrastructure/persistence/orm-entities/user-location.orm.entity';
import { NotificationsGateway } from '../../modules/notifications/infrastructure/gateways/notifications.gateway';
import { NotificationOrmEntity } from '../../modules/notifications/infrastructure/persistence/orm-entities/notification.orm-entity';
import { Job } from 'bullmq';

@Processor('notifications')
export class NotificationsProcessor extends WorkerHost {
	constructor(
		@InjectRepository(AlertOrmEntity) private alertsRepo: Repository<AlertOrmEntity>,
		@InjectRepository(UserLocationOrmEntity) private locationsRepo: Repository<UserLocationOrmEntity>,
		@InjectRepository(NotificationOrmEntity) private notificationsRepo: Repository<NotificationOrmEntity>,
		private readonly notificationsGateway: NotificationsGateway,
	) {
		super();
		console.log('NotificationsProcessor listo');
	}

	async process(job: Job<any>) {
		if (job.name === 'process-alert') {
			return this.handleProcessAlert(job.data);
		}
		if (job.name === 'report-alert') {
			return this.handleReportAlert(job.data);
		}
	}

	async handleProcessAlert({ alertId }: { alertId: number }) {
		const alert = await this.alertsRepo.findOne({ where: { id: alertId } });
		if (!alert) return;

		// Traer todas las ubicaciones con usuario cargado
		const locations = await this.locationsRepo.find({ relations: ['user'] });

		const notificationsToSave: NotificationOrmEntity[] = [];
		const sentUserIds = new Set<number>();

		for (const loc of locations) {
			if (!loc.user) continue;

			// No notificar al usuario que creó la alerta
			if (loc.user.id === alert.userId) continue;

			const distMeters = haversineMeters(
				alert.latitude,
				alert.longitude,
				loc.latitude,
				loc.longitude
			);

			if (distMeters <= (loc.radius || 5000)) {
				// Evitar duplicados
				if (sentUserIds.has(loc.user.id)) continue;
				sentUserIds.add(loc.user.id);

				const notif = this.notificationsRepo.create({
					user: { id: loc.user.id } as any,
					title: 'Alerta cercana',
					message: alert.description,
					url: `/alerts/${alert.id}`,
				});

				notificationsToSave.push(notif);
			}
		}

		// Guardar notificaciones persistentes
		if (notificationsToSave.length) {
			await this.notificationsRepo.save(notificationsToSave);

			// Emitir en tiempo real vía WebSocket
			for (const n of notificationsToSave) {
				this.notificationsGateway.emitToUser(n.userId, {
					type: 'ALERT_NEARBY',
					alertId: alert.id,
					title: n.title,
					message: n.message,
					url: n.url,
				});
			}
		}

		return { ok: true, created: notificationsToSave.length };
	}

	/**
 * Notificar al creador de la alerta que su alerta ha sido reportada
 */
	async handleReportAlert({ reportId, alertId, reporterId }: { reportId: number, alertId: number, reporterId: number }) {
		const alert = await this.alertsRepo.findOne({ where: { id: alertId }, relations: ['user'] });
		if (!alert || !alert.user) return;

		// No enviamos al reportero
		if (alert.user.id === reporterId) return;

		const notif = this.notificationsRepo.create({
			user: { id: alert.user.id } as any,
			title: 'Tu alerta ha sido reportada',
			message: `Alguien ha reportado tu alerta: "${alert.description}"`,
			url: `/alerts/${alert.id}`,
		});

		// Guardar en DB
		const saved = await this.notificationsRepo.save(notif);

		// Emitir por WebSocket
		this.notificationsGateway.emitToUser(alert.user.id, {
			type: 'ALERT_REPORTED',
			alertId: alert.id,
			reportId: reportId,
			title: saved.title,
			message: saved.message,
			url: saved.url,
		});

		return { ok: true, created: 1 };
	}

}

// Helper Haversine (metros)
function haversineMeters(lat1, lon1, lat2, lon2) {
	const R = 6371000;
	const toRad = (v: number) => (v * Math.PI) / 180;
	const dLat = toRad(lat2 - lat1);
	const dLon = toRad(lon2 - lon1);
	const a =
		Math.sin(dLat / 2) ** 2 +
		Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
	return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}
