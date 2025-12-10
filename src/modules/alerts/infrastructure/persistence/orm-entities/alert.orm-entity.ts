import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, Index, JoinColumn } from 'typeorm';
import { AlertType } from '../../../domain/entities/alert-type.enum';
import { AlertImageOrmEntity } from './alert-image.orm-entity';
import { AlertStateOrmEntity } from './alert-state.orm-entity';
import { UserOrmEntity } from '../../../../users/infrastructure/persistence/orm-entities/user.orm-entity';
import { SpeciesOrmEntity } from '../../../../pets/infrastructure/persistence/orm-entities/species.orm-entity';
import { BreedOrmEntity } from '../../../../pets/infrastructure/persistence/orm-entities/breed.orm-entity';

@Entity('alerts')
export class AlertOrmEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Index()
    @Column()
    speciesId: number;

    @Index()
    @Column({nullable: true})
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

    @Column({ type: 'timestamp with time zone', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @Column({ type: 'timestamp with time zone', default: () => 'CURRENT_TIMESTAMP' })
    updatedAt: Date;


    @ManyToOne(() => AlertStateOrmEntity)
    state: AlertStateOrmEntity;

    @ManyToOne(() => UserOrmEntity)
    @JoinColumn({ name: 'userId' })
    user: UserOrmEntity;

    @ManyToOne(() => SpeciesOrmEntity)
    @JoinColumn({ name: 'speciesId' })
    species: SpeciesOrmEntity;

    @ManyToOne(() => BreedOrmEntity)
    @JoinColumn({ name: 'breedId' })
    breed: BreedOrmEntity;
}
