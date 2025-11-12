
import { DocType } from "./../../../domain/entities/doctype.entity";
import { DocTypeOrmEntity } from "../orm-entities/doctype.orm-entity";


export class DocTypeOrmMapper {
	static toDomain(entity: DocTypeOrmEntity): DocType{
		return new DocType(entity.id, entity.name, entity.description, entity.length);
	}

	static toOrmEntity(domain: DocType): DocTypeOrmEntity {
		const orm = new DocTypeOrmEntity();
		orm.id = domain.id;
		orm.name = domain.name;
		orm.description = domain.description;
		orm.length = domain.length;
		return orm;
	}
}