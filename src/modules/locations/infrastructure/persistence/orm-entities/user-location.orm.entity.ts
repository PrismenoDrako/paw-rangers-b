import { UserOrmEntity } from '../../../../users/infrastructure/persistence/orm-entities/user.orm-entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';

/**
 * Entidad ORM para persistencia de ubicaciones frecuentes de usuarios.
 * 
 * Esta entidad se mapea a la tabla `user_locations` en PostgreSQL con PostGIS.
 * Incluye una columna `geom` geográfica para consultas espaciales rápidas.
 */
@Entity('user_locations')
export class UserLocationOrmEntity {
    /** Identificador único de la ubicación */
    @PrimaryGeneratedColumn()
    id: number;

    /** Nombre descriptivo de la ubicación */
    @Column({ type: 'varchar', length: 100 })
    name: string;

    /** Latitud de la ubicación */
    @Column('float')
    latitude: number;

    /** Longitud de la ubicación */
    @Column('float')
    longitude: number;

    /** Radio de interés en metros */
    @Column('float', { default: 5000 })
    radius: number;


    /** Fecha de creación */
    @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    /**
     * Columna geográfica PostGIS (Point) para búsquedas por distancia
     * Debe actualizarse al crear o modificar lat/lng
     */
    @Column({
        type: 'geography',
        nullable: true,
        transformer: {
            to: (v) => v,   // envía el EWKT tal cual
            from: (v) => v, // devuelve el EWKT tal cual
        },
    })
    geom: string;

    /** Relación con el usuario propietario */
    @ManyToOne(() => UserOrmEntity, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user_id' })
    user: UserOrmEntity;
}