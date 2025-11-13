import { Inject } from "@nestjs/common";
import { Pet } from "src/modules/pets/domain/entities/pet.entity";
import { PetRepository } from "../../../domain/repositories/pet.repository";

export class GetPetsByUserUseCase{

    constructor(
        @Inject(PetRepository)
        private readonly petRepository: PetRepository        
    ){}

    async execute(userId: number): Promise<Pet[]>{
        return await this.petRepository.findPetsByUser(userId);
    }
}