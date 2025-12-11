import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    OneToMany,
    Index,
    JoinColumn,
} from 'typeorm';
import { AlertOrmEntity } from '../../../../alerts/infrastructure/persistence/orm-entities/alert.orm-entity';
import { UserOrmEntity } from '../../../../users/infrastructure/persistence/orm-entities/user.orm-entity';
import { AlertReportImageOrmEntity } from './report-image.orm-entity';

@Entity('alert_reports')
export class AlertReportOrmEntity {
    @PrimaryGeneratedColumn()
    id: number;

    // --- ALERTA REPORTADA ---
    @Index()
    @Column()
    alertId: number;

    @ManyToOne(() => AlertOrmEntity, alert => alert.id, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'alertId' })
    alert: AlertOrmEntity;

    // --- USUARIO QUE REPORTA ---
    @Index()
    @Column()
    userId: number;

    @ManyToOne(() => UserOrmEntity, user => user.id, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'userId' })
    user: UserOrmEntity;

    // --- INFORMACIÓN DEL REPORTE ---
    @Column({ type: 'varchar', length: 255 })
    reason: string;

    @Column({ type: 'text', nullable: true })
    comments: string | null;

    // --- IMÁGENES ---
    @OneToMany(
        () => AlertReportImageOrmEntity,
        img => img.report,
        { cascade: true }
    )
    images: AlertReportImageOrmEntity[];

    @Column({ type: 'timestamp with time zone', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @Column({ type: 'timestamp with time zone', default: () => 'CURRENT_TIMESTAMP' })
    updatedAt: Date;
}
