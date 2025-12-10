import { PetImage } from "../../../domain/entities/pet-image.entity";
import { Pet } from "../../../domain/entities/pet.entity";
import { PetImageOrmEntity } from "../orm-entities/pet-image.orm-entity";
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
            entity.species.id,
            entity.breed ? entity.breed.id : undefined,
            entity.user.id,
            entity.isActive,
            entity.images?.map(img => new PetImage(
                img.id,
                entity.id,
                img.url,
                img.description,
                img.isMain
            )) || []
        );
    }

    /**
     * Convierte una entidad del dominio a ORM.
     * @param pet Pet del dominio
     * @returns PetOrmEntity
     */
    static toOrmEntity(pet: Pet): PetOrmEntity {
        const entity = new PetOrmEntity();
        entity.id = pet.id;
        entity.name = pet.name;
        entity.age = pet.age;
        entity.isActive = pet.isActive;

        entity.species = { id: pet.speciesId } as any;
        entity.breed = { id: pet.breedId } as any;
        entity.user = { id: pet.userId } as any;

        entity.images = pet.images?.map(img => {
            const imgEntity = new PetImageOrmEntity();
            imgEntity.id = img.id;
            imgEntity.url = img.url;
            imgEntity.description = img.description;
            imgEntity.isMain = img.isMain;
            return imgEntity;
        }) || [];

        return entity;
    }
}