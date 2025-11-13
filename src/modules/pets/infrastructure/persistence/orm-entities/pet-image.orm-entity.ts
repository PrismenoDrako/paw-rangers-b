import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { PetOrmEntity } from './pet.orm-entity';

/**
 * Entidad ORM que representa la tabla `pet_images` en la base de datos.
 *
 * Define cómo se almacenan las imágenes asociadas a una mascota.
 */
@Entity('pet_images')
export class PetImageOrmEntity {
    /**
     * Identificador único de la imagen (clave primaria).
     */
    @PrimaryGeneratedColumn()
    id: number;

    /**
     * URL o ruta donde se almacena la imagen.
     */
    @Column()
    url: string;

    /**
     * Descripción opcional de la imagen.
     */
    @Column({ nullable: true })
    description?: string;

    /**
     * Indica si esta imagen es la principal de la mascota.
     */
    @Column({ default: false })
    isMain: boolean;

    /**
     * Relación con la mascota a la que pertenece esta imagen.
     */
    @ManyToOne(() => PetOrmEntity, pet => pet.images, { onDelete: 'CASCADE' })
    pet: PetOrmEntity;
}