import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('alert_states')
export class AlertStateOrmEntity {
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 100 })
    name: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    description: string;
}
