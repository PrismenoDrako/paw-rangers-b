import { Inject } from "@nestjs/common";
import { Breed } from "../../../domain/entities/breed.entity";
import { BreedRepository } from "../../../domain/repositories/breed.repository";

export class GetAllBreedsUseCase{
    
    constructor(
        @Inject(BreedRepository)
        private readonly breedRepository: BreedRepository
    ){}

    async execute(): Promise<Breed[]>{
        return this.breedRepository.findAll();
    }
}