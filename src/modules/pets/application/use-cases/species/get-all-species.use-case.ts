import { Inject } from "@nestjs/common";
import { Species } from "../../../domain/entities/species.entity";
import { SpeciesRepository } from "../../../domain/repositories/species.repository";

export class GetAllSpeciesUseCase{
    
    constructor(
        @Inject(SpeciesRepository)
        private readonly speciesRepository: SpeciesRepository
    ){}

    async execute(): Promise<Species[]>{
        return this.speciesRepository.findAll();
    }
}