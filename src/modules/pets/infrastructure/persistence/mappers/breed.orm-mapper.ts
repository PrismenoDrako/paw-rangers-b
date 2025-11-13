import { Breed } from "../../../domain/entities/breed.entity";
import { BreedOrmEntity } from "../orm-entities/breed.orm-entity";

/**
 * Mapper responsable de convertir entre la entidad de dominio `Breed`
 * y la entidad ORM `BreedOrmEntity`.
 *
 * Este mapper actúa como una capa de traducción entre la lógica de negocio
 * (dominio) y la infraestructura (base de datos con TypeORM),
 * evitando dependencias directas del dominio con el ORM.
 */
export class BreedOrmMapper {

    /**
     * Convierte una entidad ORM (`BreedOrmEntity`) a una entidad de dominio (`Breed`).
     *
     * @param entity - Instancia de `BreedOrmEntity` obtenida desde la base de datos.
     * @returns Una nueva instancia de `Breed` lista para ser usada en la capa de dominio.
     */
    static toDomain(entity: BreedOrmEntity): Breed {
        return new Breed(
            entity.id,
            entity.name,
            entity.species?.id // Manejo seguro en caso de que species sea null
        );
    }

    /**
     * Convierte una entidad de dominio (`Breed`) a una entidad ORM (`BreedOrmEntity`).
     *
     * @param domain - Instancia de `Breed` proveniente del dominio.
     * @returns Una nueva instancia de `BreedOrmEntity` lista para ser persistida con TypeORM.
     *
     * @remarks
     * La relación con `SpeciesOrmEntity` debe establecerse en el repositorio,
     * ya que este mapper solo asigna el identificador de especie (`species_id`)
     * y no la instancia completa de la entidad relacionada.
     */
    static toOrmEntity(domain: Breed): BreedOrmEntity {
        const ormEntity = new BreedOrmEntity();
        ormEntity.id = domain.id;
        ormEntity.name = domain.name;
        // La relación con SpeciesOrmEntity se asigna en el Repository
        return ormEntity;
    }
}