/**
 * @module Domain/Repositories
 */

import { Notification } from '../entities/notification.entity';

/**
 * Repositorio abstracto para gestionar notificaciones.
 *
 * Define las operaciones que deben implementarse en la capa
 * de infraestructura, manteniendo el dominio desacoplado de
 * cualquier tecnología de persistencia (TypeORM, SQL, etc.)
 */
export abstract class NotificationRepository {
    
    /**
     * Crea y persiste una notificación.
     *
     * @param notification Entidad de dominio a persistir
     * @returns Notificación creada con ID asignado
     */
    abstract create(notification: Notification): Promise<Notification>;

    /**
     * Obtiene todas las notificaciones de un usuario específico.
     *
     * @param userId ID del usuario
     * @returns Lista de notificaciones del usuario
     */
    abstract findByUser(userId: number): Promise<Notification[]>;

    /**
     * Marca una notificación como leída.
     *
     * @param notificationId ID de la notificación
     * @param userId ID del propietario (para evitar accesos indebidos)
     */
    abstract markAsRead(notificationId: number, userId: number): Promise<void>;

    /**
     * Elimina una notificación del usuario.
     *
     * @param notificationId ID de la notificación
     * @param userId ID del propietario
     */
    abstract delete(notificationId: number, userId: number): Promise<void>;
}
