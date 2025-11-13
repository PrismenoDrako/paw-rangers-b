import { PetImage } from "../../../domain/entities/pet-image.entity";
import { PetImageOrmEntity } from "../orm-entities/pet-image.orm-entity";

/**
 * Mapper responsable de convertir entre la entidad de dominio `PetImage`
 * y la entidad ORM `PetImageOrmEntity`.
 *
 * Este mapper desacopla la lógica de negocio del ORM,
 * facilitando cambios en la capa de persistencia sin afectar el dominio.
 */
export class PetImageOrmMapper {
    /**
     * Convierte una entidad ORM (`PetImageOrmEntity`) a una entidad de dominio (`PetImage`).
     *
     * @param entity - Instancia de `PetImageOrmEntity` obtenida desde la base de datos.
     * @returns Una instancia de `PetImage` lista para usarse en la capa de dominio.
     */
    static toDomain(entity: PetImageOrmEntity): PetImage {
        return new PetImage(
            entity.id,
            entity.pet?.id,
            entity.url,
            entity.description,
            entity.isMain,
        );
    }

    /**
     * Convierte una entidad de dominio (`PetImage`) a una entidad ORM (`PetImageOrmEntity`).
     *
     * @param domain - Instancia de `PetImage` proveniente de la capa de dominio.
     * @returns Una nueva instancia de `PetImageOrmEntity` lista para ser persistida con TypeORM.
     *
     * @remarks
     * La relación con `PetOrmEntity` debe asignarse en el repositorio antes de guardar.
     */
    static toOrmEntity(domain: PetImage): PetImageOrmEntity {
        const ormEntity = new PetImageOrmEntity();
        ormEntity.id = domain.id;
        ormEntity.url = domain.url;
        ormEntity.description = domain.description;
        ormEntity.isMain = domain.isMain;
        // Relación con PetOrmEntity se asigna en el repositorio
        return ormEntity;
    }
}