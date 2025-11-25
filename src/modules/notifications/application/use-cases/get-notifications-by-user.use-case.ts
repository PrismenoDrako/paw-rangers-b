/**
 * @module Application/UseCases/Notifications
 */

import { Injectable } from '@nestjs/common';
import { NotificationRepository } from '../../domain/repositories/notification.repository';
import { Notification } from '../../domain/entities/notification.entity';

/**
 * Caso de uso para obtener todas las notificaciones
 * de un usuario específico.
 */
@Injectable()
export class GetNotificationsByUserUseCase {

    constructor(
        private readonly notificationRepo: NotificationRepository,
    ) {}

    /**
     * Devuelve todas las notificaciones pertenecientes a un usuario.
     *
     * @param userId ID del usuario dueño de las notificaciones
     */
    async execute(userId: number): Promise<Notification[]> {
        return this.notificationRepo.findByUser(userId);
    }
}
