import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	Index,
	ManyToOne,
	JoinColumn,
} from 'typeorm';
import { AlertReportOrmEntity } from './report.orm-entitiy';

@Entity('alert_report_images')
export class AlertReportImageOrmEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Index()
	@Column()
	reportId: number;

	@ManyToOne(
		() => AlertReportOrmEntity,
		report => report.images,
		{ onDelete: 'CASCADE' }
	)
	@JoinColumn({ name: 'reportId' })
	report: AlertReportOrmEntity;

	@Column({ type: 'varchar', length: 500 })
	url: string;

	@Column({ type: 'timestamp with time zone', default: () => 'CURRENT_TIMESTAMP' })
	createdAt: Date;
}
