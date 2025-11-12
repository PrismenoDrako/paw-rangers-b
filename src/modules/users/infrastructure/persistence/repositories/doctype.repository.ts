import { Injectable } from "@nestjs/common";
import { IDocTypeRepository } from "../../../domain/repositories/doctype.repository";
import { DocTypeOrmEntity } from "../orm-entities/doctype.orm-entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { DocType } from "./../../../domain/entities/doctype.entity";
import { DocTypeOrmMapper } from "../mappers/doctype.orm-mapper";


@Injectable()
export class DocTypeRepository extends IDocTypeRepository {

	constructor(
		@InjectRepository(DocTypeOrmEntity)
		private readonly repository: Repository<DocTypeOrmEntity>,
	) {
        super();
    }

    async findAll(): Promise<DocType[]> {
		const ormEntities = await this.repository.find();

		// Mapear al dominio
		return ormEntities.map(entity => DocTypeOrmMapper.toDomain(entity));
	}

    save(docType: DocType): Promise<DocType> {
        throw new Error("Method not implemented.");
    }
    findById(id: number): Promise<DocType | null> {
        throw new Error("Method not implemented.");
    }
    findByName(name: string): Promise<DocType | null> {
        throw new Error("Method not implemented.");
    }
    delete(id: number): Promise<void> {
        throw new Error("Method not implemented.");
    }

	
}