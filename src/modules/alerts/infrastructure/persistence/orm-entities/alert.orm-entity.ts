import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, Index } from 'typeorm';
import { AlertType } from '../../../domain/entities/alert-type.enum';
import { AlertImageOrmEntity } from './alert-image.orm-entity';
import { AlertStateOrmEntity } from './alert-state.orm-entity';

@Entity('alerts')
export class AlertOrmEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Index()
    @Column()
    speciesId: number;

    @Index()
    @Column()
    breedId: number;

    @Column({ type: 'varchar', length: 500 })
    description: string;

    @Column({ type: 'decimal', precision: 10, scale: 6 })
    latitude: number;

    @Column({ type: 'decimal', precision: 10, scale: 6 })
    longitude: number;

    @Column({ type: 'timestamp with time zone' })
    date: Date;

    @Index()
    @Column()
    userId: number;

    @Index()
    @Column()
    stateId: number;

    @Column({
        type: 'enum',
        enum: AlertType,
    })
    type: AlertType;

    @OneToMany(
        () => AlertImageOrmEntity,
        img => img.alert,
        { cascade: true } // crea/actualiza imágenes automáticamente
    )
    images: AlertImageOrmEntity[];

    @Column({ type: 'timestamp with time zone' })
    createdAt: Date;

    @Column({ type: 'timestamp with time zone' })
    updatedAt: Date;

    @ManyToOne(() => AlertStateOrmEntity)
    state: AlertStateOrmEntity;
}
