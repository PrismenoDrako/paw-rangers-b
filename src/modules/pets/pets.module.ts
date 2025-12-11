import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SpeciesController } from './infrastructure/controllers/species/species.controller';
import { BreedsController } from './infrastructure/controllers/breeds/breeds.controller';
import { BreedOrmEntity } from './infrastructure/persistence/orm-entities/breed.orm-entity';
import { SpeciesOrmEntity } from './infrastructure/persistence/orm-entities/species.orm-entity';
import { PetOrmEntity } from './infrastructure/persistence/orm-entities/pet.orm-entity';
import { PetImageOrmEntity } from './infrastructure/persistence/orm-entities/pet-image.orm-entity';
import { SpeciesOrmRepository } from './infrastructure/persistence/repositories/species.orm-repository';
import { SpeciesRepository } from './domain/repositories/species.repository';
import { GetAllSpeciesUseCase } from './application/use-cases/species/get-all-species.use-case';
import { BreedOrmRepository } from './infrastructure/persistence/repositories/breed.orm-repository';
import { BreedRepository } from './domain/repositories/breed.repository';
import { GetAllBreedsUseCase } from './application/use-cases/breed/get-all-breeds.use-case';
import { PetsController } from './infrastructure/controllers/pets/pets.controller';
import { PetOrmRepository } from './infrastructure/persistence/repositories/pet.orm-repository';
import { PetRepository } from './domain/repositories/pet.repository';
import { GetPetsByUserUseCase } from './application/use-cases/pet/get-pets-by-user.use-case';
import { CreatePetUseCase } from './application/use-cases/pet/create-pet.use-case';
import { StorageModule } from '../storage/storage.module';
import { PetsService } from './infrastructure/services/pets/pets.service';



@Module({
	imports: [
		TypeOrmModule.forFeature([SpeciesOrmEntity, BreedOrmEntity, PetOrmEntity, PetImageOrmEntity]),
		StorageModule
	],
	controllers: [SpeciesController, BreedsController, PetsController],
	providers: [
		SpeciesOrmRepository,
		{
			provide: SpeciesRepository,
			useExisting: SpeciesOrmRepository
		},
		GetAllSpeciesUseCase,
		BreedOrmRepository,
		{
			provide: BreedRepository,
			useExisting: BreedOrmRepository
		},
		GetAllBreedsUseCase,
		PetOrmRepository,
		{
			provide: PetRepository,
			useExisting: PetOrmRepository
		},
		GetPetsByUserUseCase,
		CreatePetUseCase,
		PetsService,
	],
	exports:[
		GetAllSpeciesUseCase,
		GetAllBreedsUseCase,
		GetPetsByUserUseCase,
		CreatePetUseCase,		
	]
})
export class PetsModule { }
