import { User } from '../../../domain/entities/user.entity';
import { RoleOrmMapper } from './role.orm-mapper';
import { DocTypeOrmMapper } from './doctype.orm-mapper';
import { UserOrmEntity } from '../orm-entities/user.orm-entity';
import { Password } from 'src/modules/users/domain/value-objects/password.vo';
import { Email } from 'src/modules/users/domain/value-objects/email.vo';

export class UserOrmMapper {
	static toDomain(entity: UserOrmEntity): User | undefined {
		if (!entity) return undefined;

		return new User(
			entity.id,
			entity.username,
            Password.fromHash(entity.password),
            Email.create(entity.email),
			entity.name,
			entity.lastName1,
			entity.lastName2,
			DocTypeOrmMapper.toDomain(entity.docType!)?.id,
			entity.docNumber,
			entity.address,
			RoleOrmMapper.toDomain(entity.role!)?.id,
			entity.isActive,
		);
	}

	static toOrmEntity(domain: User): UserOrmEntity {
		const orm = new UserOrmEntity();
		orm.id = domain.id;
		orm.username = domain.username;
		orm.password = domain.password.value;
		orm.email = domain.email.getValue();
		orm.name = domain.name;
		orm.lastName1 = domain.lastName1;
		orm.lastName2 = domain.lastName2;
		orm.docNumber = domain.docNumber;
		orm.address = domain.address;
		orm.isActive = domain.isActive;
		return orm;
	}
}