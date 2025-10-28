import { Role } from "src/modules/users/domain/entities/role.entity";
import { RoleOrmEntity } from "../orm-entities/role.orm-entity";


export class RoleOrmMapper {
	static toDomain(entity: RoleOrmEntity): Role | undefined {
		if (!entity) return undefined;

		return new Role(
			entity.id,
			entity.name,
			entity.isCollaborator
		);
	}

	static toOrmEntity(domain: Role): RoleOrmEntity {
		const orm = new RoleOrmEntity();
		orm.id = domain.id;
		orm.name = domain.name;
		orm.isCollaborator = domain.isCollaborator;
		return orm;
	}
}