import { Species } from "../../../domain/entities/species.entity";
import { SpeciesOrmEntity } from "../orm-entities/species.orm-entity";

/**
 * Mapper que convierte entre la entidad de dominio `Species` y la entidad ORM `SpeciesOrmEntity`.
 *
 * Este mapper permite aislar la lógica del dominio de la infraestructura,
 * evitando dependencias directas de TypeORM en la capa de dominio.
 */
export class SpeciesMapper {
	/**
	 * Convierte una entidad ORM (`SpeciesOrmEntity`) a una entidad de dominio (`Species`).
	 *
	 * @param ormEntity - Instancia de `SpeciesOrmEntity` proveniente de la base de datos.
	 * @returns Una nueva instancia de `Species` lista para ser usada en la capa de dominio.
	 */
	static toDomain(ormEntity: SpeciesOrmEntity): Species {
		return new Species(
			ormEntity.id,
			ormEntity.name,
			ormEntity.scientificName
		);
	}

	/**
	 * Convierte una entidad de dominio (`Species`) a una entidad ORM (`SpeciesOrmEntity`).
	 *
	 * @param domainEntity - Instancia de `Species` proveniente del dominio.
	 * @returns Una nueva instancia de `SpeciesOrmEntity` lista para ser persistida con TypeORM.
	 */
	static toOrmEntity(domainEntity: Species): SpeciesOrmEntity {
		const ormEntity = new SpeciesOrmEntity();
		ormEntity.id = domainEntity.id;
		ormEntity.name = domainEntity.name;
		ormEntity.scientificName = domainEntity.scientificName;
		return ormEntity;
	}
}