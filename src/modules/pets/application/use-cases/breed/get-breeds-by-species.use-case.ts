import { Inject } from "@nestjs/common";
import { Breed } from "../../../domain/entities/breed.entity";
import { BreedRepository } from "src/modules/pets/domain/repositories/breed.repository";

export class GetBreedsBySpeciesUseCase{
    
    constructor(
        @Inject(BreedRepository)
        private readonly breedRepository: BreedRepository
    ){}

    async execute(speciesId): Promise<Breed[]>{
        return this.breedRepository.findBySpeciesId(speciesId);
    }
}