import { GenericRepository } from "../../../shared/domain/generic.repository";
import { PetImage } from "../entities/pet-image.entity";

export abstract class PetImageRepository extends GenericRepository<PetImage>{
}