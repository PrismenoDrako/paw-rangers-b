/**
 * @module Infrastructure/Persistence/OrmEntities
 */

import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, RelationId } from 'typeorm';
import { UserOrmEntity } from '../../../../users/infrastructure/persistence/orm-entities/user.orm-entity';

/**
 * ORM Entity para la tabla `notifications`.
 *
 * Incluye una relación ManyToOne con `UserOrmEntity` y expone
 * el identificador del usuario mediante `@RelationId`.
 */
@Entity('notifications')
export class NotificationOrmEntity {
    /**
     * Identificador único generado por la base de datos.
     */
    @PrimaryGeneratedColumn()
    id: number;

    /**
     * Relación con el usuario al que va dirigida la notificación.
     * Genera la columna `user_id` como FK.
     */
    @ManyToOne(() => UserOrmEntity, { nullable: false, onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user_id' })
    user: UserOrmEntity;

    /**
     * Campo auxiliar que contiene el id del usuario relacionado.
     * Se rellena automáticamente por TypeORM a partir de la relación.
     * Útil para consultas sin necesidad de hacer `join` al usuario.
     */
    @RelationId((notification: NotificationOrmEntity) => notification.user)
    userId: number;

    /**
     * Título de la notificación.
     */
    @Column({ type: 'varchar', length: 255 })
    title: string;

    /**
     * Mensaje de la notificación.
     */
    @Column({ type: 'text' })
    message: string;

    /**
     * URL opcional para navegar al detalle.
     */
    @Column({ type: 'varchar', length: 500, nullable: true })
    url: string | null;

    /**
     * Fecha de creación.
     */
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    /**
     * Flag que indica si el usuario ya leyó la notificación.
     */
    @Column({ type: 'boolean', default: false })
    isRead: boolean;
}
