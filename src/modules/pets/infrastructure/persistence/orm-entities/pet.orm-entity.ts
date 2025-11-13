import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { SpeciesOrmEntity } from "./species.orm-entity";
import { BreedOrmEntity } from "./breed.orm-entity";
import { UserOrmEntity } from "../../../../users/infrastructure/persistence/orm-entities/user.orm-entity";
import { PetImageOrmEntity } from "./pet-image.orm-entity";

/**
 * Entidad ORM que representa la tabla `pets` en la base de datos.
 *
 * Esta clase se utiliza únicamente en la capa de infraestructura
 * y mapea los campos del dominio `Pet` a las columnas de la base de datos.
 */
@Entity('pets')
export class PetOrmEntity {
    /**
     * Identificador único de la mascota (clave primaria).
     */
    @PrimaryGeneratedColumn()
    id: number;

    /**
     * Nombre de la mascota.
     */
    @Column()
    name: string;

    /**
     * Edad de la mascota (en años o meses, según la configuración del sistema).
     */
    @Column()
    age: number;

    /**
     * Relación con la especie de la mascota.
     */
    @ManyToOne(() => SpeciesOrmEntity, { eager: true })
    species: SpeciesOrmEntity;

    /**
     * Relación con la raza de la mascota.
     */
    @ManyToOne(() => BreedOrmEntity, { eager: true })
    breed: BreedOrmEntity;

    /**
     * Relación con el usuario propietario de la mascota.
     */
    @ManyToOne(() => UserOrmEntity, { eager: true })
    user: UserOrmEntity;

    /**
     * Indica si la mascota está activa en el sistema.
     */
    @Column({ default: true })
    isActive: boolean;


    /**
     * Imágenes asociadas a la mascota.
     */
    @OneToMany(() => PetImageOrmEntity, image => image.pet, { cascade: true })
    images: PetImageOrmEntity[];
}