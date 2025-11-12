import { UserOrmEntity } from '../orm-entities/user.orm-entity';
import { User } from '../../../domain/entities/user.entity';
import { Email } from '../../../domain/value-objects/email.vo';
import { Password } from '../../../domain/value-objects/password.vo';

/**
 * Mapper responsable de convertir entre:
 * - Entidades del dominio (`User`)
 * - Entidades ORM (`UserOrmEntity`)
 *
 * Mantiene la capa de dominio independiente de TypeORM.
 */
export class UserOrmMapper {
	/**
	 * Convierte una entidad ORM en una entidad de dominio.
	 *
	 * @param ormEntity Entidad ORM (`UserOrmEntity`)
	 * @returns Entidad de dominio (`User`)
	 */
	static toDomain(ormEntity: UserOrmEntity | null): User {
		if (!ormEntity) {
			throw new Error('UserOrmMapper.toDomain: ormEntity es undefined o null');
		}

		return new User(
			ormEntity.id,
			ormEntity.username,
			Password.fromHash(ormEntity.password), // creamos VO desde hash
			Email.create(ormEntity.email),
			ormEntity.name,
			ormEntity.lastName1,
			ormEntity.lastName2,
			ormEntity.docType ? ormEntity.docType.id : undefined, // solo ID
			ormEntity.docNumber,
			ormEntity.address,
			ormEntity.role ? ormEntity.role.id : undefined, // solo ID
			ormEntity.isActive,
		);
	}

	/**
	 * Convierte una entidad de dominio en una entidad ORM lista para persistir.
	 *
	 * Las relaciones (`role`, `docType`) deben asignarse en el repositorio.
	 *
	 * @param domain Entidad de dominio (`User`)
	 * @returns Entidad ORM (`UserOrmEntity`)
	 */
	static toOrmEntity(domain: User): UserOrmEntity {
		if (!domain) {
			throw new Error('UserOrmMapper.toOrmEntity: domain es undefined o null');
		}

		const ormEntity = new UserOrmEntity();
		ormEntity.id = domain.id;
		ormEntity.username = domain.username;
		ormEntity.password = domain.password.value; // tomamos valor del VO
		ormEntity.email = domain.email.getValue();
		ormEntity.name = domain.name;
		ormEntity.lastName1 = domain.lastName1;
		ormEntity.lastName2 = domain.lastName2;
		ormEntity.docNumber = domain.docNumber;
		ormEntity.address = domain.address;
		ormEntity.isActive = domain.isActive;

		// Relaciones se asignan en el repositorio (role, docType)
		return ormEntity;
	}
}