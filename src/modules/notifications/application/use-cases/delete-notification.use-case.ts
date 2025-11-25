/**
 * @module Application/UseCases/Notifications
 */

import { Injectable } from '@nestjs/common';
import { NotificationRepository } from '../../domain/repositories/notification.repository';

/**
 * Caso de uso para eliminar una notificación de un usuario.
 */
@Injectable()
export class DeleteNotificationUseCase {

    constructor(
        private readonly notificationRepo: NotificationRepository,
    ) {}

    /**
     * Elimina una notificación si pertenece al usuario.
     *
     * @param notificationId ID de la notificación
     * @param userId ID del propietario
     */
    async execute(notificationId: number, userId: number): Promise<void> {
        await this.notificationRepo.delete(notificationId, userId);
    }
}
