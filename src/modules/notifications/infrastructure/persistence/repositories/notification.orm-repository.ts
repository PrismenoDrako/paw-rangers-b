/**
 * @module Infrastructure/Persistence/Repositories
 */

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { NotificationRepository } from '../../../domain/repositories/notification.repository';
import { Notification } from '../../../domain/entities/notification.entity';
import { NotificationMapper } from '../mappers/notification.orm-mapper';

import { NotificationOrmEntity } from '../orm-entities/notification.orm-entity';

/**
 * Implementación del repositorio de notificaciones usando TypeORM.
 *
 * Esta clase traduce las entidades de dominio a entidades ORM y viceversa,
 * manteniendo la lógica de acceso a datos fuera del dominio.
 */
@Injectable()
export class NotificationOrmRepository extends NotificationRepository {
    
    constructor(
        @InjectRepository(NotificationOrmEntity)
        private readonly ormRepo: Repository<NotificationOrmEntity>,
    ) {
        super();
    }

    /**
     * @inheritdoc
     */
    async create(notification: Notification): Promise<Notification> {
        const orm = NotificationMapper.toOrmEntity(notification);
        const saved = await this.ormRepo.save(orm);
        return NotificationMapper.toDomainEntity(saved);
    }

    /**
     * @inheritdoc
     */
    async findByUser(userId: number): Promise<Notification[]> {
        const ormList = await this.ormRepo.find({
            where: { user: { id: userId } },
            order: { createdAt: 'DESC' },
        });

        return NotificationMapper.toDomainList(ormList);
    }

    /**
     * @inheritdoc
     */
    async markAsRead(notificationId: number, userId: number): Promise<void> {
        await this.ormRepo.update(
            { id: notificationId, user: { id: userId } },
            { isRead: true },
        );
    }

    /**
     * @inheritdoc
     */
    async delete(notificationId: number, userId: number): Promise<void> {
        await this.ormRepo.delete({
            id: notificationId,
            user: { id: userId },
        });
    }
}
