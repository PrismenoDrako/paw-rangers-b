import { GenericRepository } from "src/modules/shared/domain/generic.repository";
import { Pet } from "../entities/pet.entity";

export abstract class PetRepository extends GenericRepository<Pet>{
    abstract findPetsByUser(userId: number) : Promise<Pet[]>;
}