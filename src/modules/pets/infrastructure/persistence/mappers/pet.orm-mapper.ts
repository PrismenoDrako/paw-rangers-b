import { Pet } from "../../../domain/entities/pet.entity";
import { PetOrmEntity } from "../orm-entities/pet.orm-entity";

/**
 * Mapper responsable de convertir entre la entidad de dominio `Pet`
 * y la entidad ORM `PetOrmEntity`.
 *
 * Este mapper desacopla la lógica de negocio (dominio) de la infraestructura (ORM),
 * permitiendo mantener independencia del framework de persistencia.
 */
export class PetOrmMapper {

    /**
     * Convierte una entidad ORM (`PetOrmEntity`) a una entidad de dominio (`Pet`).
     *
     * @param entity - Instancia de `PetOrmEntity` obtenida desde la base de datos.
     * @returns Una nueva instancia de `Pet` lista para usarse en la capa de dominio.
     */
    static toDomain(entity: PetOrmEntity): Pet {
        return new Pet(
            entity.id,
            entity.name,
            entity.age,
            entity.species?.id,
            entity.breed?.id,
            entity.user?.id,
            entity.isActive,
        );
    }

    /**
     * Convierte una entidad de dominio (`Pet`) a una entidad ORM (`PetOrmEntity`).
     *
     * @param domain - Instancia de `Pet` proveniente de la capa de dominio.
     * @returns Una nueva instancia de `PetOrmEntity` lista para ser persistida con TypeORM.
     *
     * @remarks
     * Las relaciones (`species`, `breed`, `user`) deben asignarse en el repositorio
     * antes de guardar la entidad, ya que aquí solo se copian los datos básicos.
     */
    static toOrmEntity(domain: Pet): PetOrmEntity {
        const ormEntity = new PetOrmEntity();
        ormEntity.id = domain.id;
        ormEntity.name = domain.name;
        ormEntity.age = domain.age;
        ormEntity.isActive = domain.isActive;
        // Relaciones species, breed y user se asignan en el repositorio
        return ormEntity;
    }
}