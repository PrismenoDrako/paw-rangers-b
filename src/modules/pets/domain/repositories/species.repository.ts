import { GenericRepository } from "../../../shared/domain/generic.repository";
import { Species } from "../entities/species.entity";

export abstract class SpeciesRepository extends GenericRepository<Species>{

}