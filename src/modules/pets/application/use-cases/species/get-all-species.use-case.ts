import { Inject } from "@nestjs/common";
import { Species } from "src/modules/pets/domain/entities/species.entity";
import { SpeciesRepository } from "src/modules/pets/domain/repositories/species.repository";

export class GetAllSpeciesUseCase{
    
    constructor(
        @Inject(SpeciesRepository)
        private readonly speciesRepository: SpeciesRepository
    ){}

    async execute(): Promise<Species[]>{
        return this.speciesRepository.findAll();
    }
}