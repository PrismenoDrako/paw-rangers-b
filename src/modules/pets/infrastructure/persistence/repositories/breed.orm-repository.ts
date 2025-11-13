import { Breed } from "../../../domain/entities/breed.entity";
import { BreedRepository } from "../../../domain/repositories/breed.repository";
import { InjectRepository } from "@nestjs/typeorm";
import { BreedOrmEntity } from "../orm-entities/breed.orm-entity";
import { BreedOrmMapper } from "../mappers/breed.orm-mapper";
import { Repository } from "typeorm";

export class BreedOrmRepository extends BreedRepository {

    constructor(
        @InjectRepository(BreedOrmEntity)
        private readonly breedRepository: Repository<BreedOrmEntity>
    ) {
        super();
    }


    findBySpeciesId(speciesId: number): Promise<Breed[]> {
        throw new Error("Method not implemented.");
    }
    async save(entity: Breed): Promise<Breed> {
        const ormEntity = this.breedRepository.create({
            name: entity.name,
            species: { id: entity.speciesId },
        });

        const saved = await this.breedRepository.save(ormEntity);
        return BreedOrmMapper.toDomain(saved);
    }
    async findAll(): Promise<Breed[]> {
        const breeds = await this.breedRepository.find({ relations: ['species'] });
        return breeds.map(breed => BreedOrmMapper.toDomain(breed));
    }
    async update(entity: Breed): Promise<Breed> {
        await this.breedRepository.update(entity.id, {
            name: entity.name,
            species: { id: entity.speciesId },
        });
        const updated = await this.breedRepository.findOne({ where: { id: entity.id }, relations: ['species'] });
        return BreedOrmMapper.toDomain(updated!);
    }
    delete(id: number): Promise<boolean> {
        throw new Error("Method not implemented.");
    }


}