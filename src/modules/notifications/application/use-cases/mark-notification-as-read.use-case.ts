/**
 * @module Application/UseCases/Notifications
 */

import { Injectable } from '@nestjs/common';
import { NotificationRepository } from '../../domain/repositories/notification.repository';

/**
 * Caso de uso para marcar una notificación como leída.
 */
@Injectable()
export class MarkNotificationAsReadUseCase {

    constructor(
        private readonly notificationRepo: NotificationRepository,
    ) {}

    /**
     * Marca una notificación como leída.
     *
     * @param notificationId ID de la notificación
     * @param userId ID del usuario (garantiza seguridad)
     */
    async execute(notificationId: number, userId: number): Promise<void> {
        await this.notificationRepo.markAsRead(notificationId, userId);
    }
}
