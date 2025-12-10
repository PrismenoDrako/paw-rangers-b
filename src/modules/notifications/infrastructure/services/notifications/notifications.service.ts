import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotificationOrmEntity } from '../../persistence/orm-entities/notification.orm-entity';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectRepository(NotificationOrmEntity)
    private readonly notificationsRepo: Repository<NotificationOrmEntity>,
  ) {}

  /**
   * Obtiene las notificaciones de un usuario con paginación.
   * @param userId ID del usuario
   * @param page Página (1-indexed)
   * @param size Cantidad de items por página
   * @param isRead Filtrado opcional por leídas/no leídas
   */
  async getUserNotifications(
    userId: number,
    page: number = 1,
    size: number = 20,
    isRead?: boolean,
  ) {
    const query = this.notificationsRepo.createQueryBuilder('notification')
      .where('notification.user_id = :userId', { userId })
      .orderBy('notification.createdAt', 'DESC')
      .skip((page - 1) * size)
      .take(size);

    if (isRead !== undefined) {
      query.andWhere('notification.isRead = :isRead', { isRead });
    }

    const [data, total] = await query.getManyAndCount();

    return {
      data,
      total,
      page,
      size,
      totalPages: Math.ceil(total / size),
    };
  }

  /**
   * Marca una notificación como leída.
   * @param userId ID del usuario propietario
   * @param notificationId ID de la notificación
   * @returns La notificación actualizada
   */
  async markAsRead(userId: number, notificationId: number) {
    const notification = await this.notificationsRepo.findOne({
      where: { id: notificationId, user: { id: userId } },
    });

    if (!notification) {
      return null; // o lanzar NotFoundException
    }

    notification.isRead = true;
    return this.notificationsRepo.save(notification);
  }
}
