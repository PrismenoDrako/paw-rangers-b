import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { PetRepository } from "../../../domain/repositories/pet.repository";
import { PetOrmEntity } from "../orm-entities/pet.orm-entity";
import { Pet } from "../../../domain/entities/pet.entity";
import { Repository } from "typeorm";
import { PetOrmMapper } from "../mappers/pet.orm-mapper";

@Injectable()
export class PetOrmRepository extends PetRepository {

    constructor(
        @InjectRepository(PetOrmEntity)
        private readonly petRepository: Repository<PetOrmEntity>,
    ) {
        super();
    }

    async findPetsByUser(userId: number): Promise<Pet[]> {
        const ormEntities = await this.petRepository.find({
            where: {
                user: { id: userId },
                isActive: true, // opcional, si solo quieres las activas
            },
            relations: ['species', 'breed', 'images'],
        });
        return ormEntities.map( ormPet => PetOrmMapper.toDomain(ormPet) );
    }

    async save(pet: Pet): Promise<Pet> {
		// 🔹 Convertir entidad de dominio → ORM
		const petOrm = PetOrmMapper.toOrmEntity(pet);

		// 🔹 Guardar
		const savedPet = await this.petRepository.save(petOrm);

		// 🔹 Devolver como entidad de dominio
		return PetOrmMapper.toDomain(savedPet);
	}
    findAll(): Promise<Pet[]> {
        throw new Error("Method not implemented.");
    }
    update(species: Pet): Promise<Pet> {
        throw new Error("Method not implemented.");
    }
    delete(id: number): Promise<boolean> {
        throw new Error("Method not implemented.");
    }


}