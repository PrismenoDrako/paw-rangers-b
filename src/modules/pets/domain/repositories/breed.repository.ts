import { GenericRepository } from "src/modules/shared/domain/generic.repository";
import { Breed } from "../entities/breed.entity";

export abstract class BreedRepository extends GenericRepository<Breed>{

    abstract findBySpeciesId(speciesId: number): Promise<Breed[]>;
    
}