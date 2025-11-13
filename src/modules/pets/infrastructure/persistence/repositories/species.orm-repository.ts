import { Species } from "../../../domain/entities/species.entity";
import { SpeciesRepository } from "../../../domain/repositories/species.repository";
import { InjectRepository } from "@nestjs/typeorm";
import { SpeciesOrmEntity } from "../orm-entities/species.orm-entity";
import { Repository } from "typeorm";
import { SpeciesMapper } from "../mappers/species.orm-mapper";

export class SpeciesOrmRepository extends SpeciesRepository {

    constructor(
        @InjectRepository(SpeciesOrmEntity)
        private readonly speciesRepository: Repository<SpeciesOrmEntity>
    ) {
        super();
    }

    async save(entity: Species): Promise<Species> {
        const ormEntity = this.speciesRepository.create({
            name: entity.name,
            scientificName: entity.scientificName,
        });

        const saved = await this.speciesRepository.save(ormEntity);
        return SpeciesMapper.toDomain(saved);
    }
    async findAll(): Promise<Species[]> {
        const species = await this.speciesRepository.find();
        return species.map(species => SpeciesMapper.toDomain(species));
    }
    update(species: Species): Promise<Species> {
        throw new Error("Method not implemented.");
    }
    delete(id: number): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

}