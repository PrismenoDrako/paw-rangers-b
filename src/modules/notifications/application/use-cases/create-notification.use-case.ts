/**
 * @module Application/UseCases/Notifications
 */

import { Injectable } from '@nestjs/common';
import { NotificationRepository } from '../../domain/repositories/notification.repository';
import { Notification } from '../../domain/entities/notification.entity';

/**
 * Caso de uso para crear una notificación.
 *
 * Este caso de uso es utilizado por procesos internos del sistema,
 * como nuevas alertas, coincidencias de mascotas, etc.
 */
@Injectable()
export class CreateNotificationUseCase {

    constructor(
        private readonly notificationRepo: NotificationRepository,
    ) {}

    /**
     * Ejecuta la creación de una notificación.
     *
     * @param input Datos necesarios para crear la notificación
     * @returns La notificación creada
     */
    async execute(input: {
        userId: number;
        title: string;
        message: string;
        url?: string;
    }): Promise<Notification> {

        const notification = new Notification({
            userId: input.userId,
            title: input.title,
            message: input.message,
            url: input.url,
        });

        return this.notificationRepo.create(notification);
    }
}
