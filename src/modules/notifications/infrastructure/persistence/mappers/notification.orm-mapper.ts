/**
 * @module Application/Mappers
 */

import { Notification } from '../../../domain/entities/notification.entity';
import { NotificationOrmEntity } from '../orm-entities/notification.orm-entity';

/**
 * Mapper encargado de convertir entre:
 * - La entidad de dominio `Notification`
 * - La entidad ORM `NotificationOrmEntity`
 *
 * Este mapper garantiza que el dominio permanezca independiente
 * del framework (TypeORM) y de la infraestructura.
 */
export class NotificationMapper {

    /**
     * Convierte una entidad de dominio `Notification`
     * en una entidad ORM `NotificationOrmEntity` lista para persistir.
     *
     * @param domain Entidad de dominio
     * @returns Instancia de `NotificationOrmEntity`
     */
    static toOrmEntity(domain: Notification): NotificationOrmEntity {
        const orm = new NotificationOrmEntity();

        orm.id = domain.id ?? undefined;
        orm.title = domain.title;
        orm.message = domain.message;
        orm.url = domain.url ?? null;
        orm.createdAt = domain.createdAt;
        orm.isRead = domain.isRead;

        // Asignamos solo la referencia al usuario sin cargarlo
        orm.user = { id: domain.userId } as any;

        return orm;
    }

    /**
     * Convierte una entidad ORM `NotificationOrmEntity`
     * en una entidad de dominio `Notification`.
     *
     * Esta conversión asegura que solo se transmiten
     * los datos necesarios hacia la capa de dominio.
     *
     * @param orm Entidad ORM
     * @returns Instancia de `Notification`
     */
    static toDomainEntity(orm: NotificationOrmEntity): Notification {
        return new Notification({
            id: orm.id,
            userId: orm.userId,    // RelationId extraído automáticamente
            title: orm.title,
            message: orm.message,
            url: orm.url ?? undefined,
            createdAt: orm.createdAt,
            isRead: orm.isRead,
        });
    }

    /**
     * Convierte una lista de entidades ORM
     * a una lista de entidades de dominio.
     *
     * @param list Lista de entidades ORM
     * @returns Lista de entidades de dominio
     */
    static toDomainList(list: NotificationOrmEntity[]): Notification[] {
        return list.map((item) => this.toDomainEntity(item));
    }
}
