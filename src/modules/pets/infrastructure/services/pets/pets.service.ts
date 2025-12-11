import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PetOrmEntity } from '../../persistence/orm-entities/pet.orm-entity';
import { Repository } from 'typeorm';
import { PetImageOrmEntity } from '../../persistence/orm-entities/pet-image.orm-entity';

@Injectable()
export class PetsService {
    constructor(
        @InjectRepository(PetOrmEntity)
        private readonly petRepository: Repository<PetOrmEntity>,
        @InjectRepository(PetImageOrmEntity)
        private readonly petImageRepository: Repository<PetImageOrmEntity>
    ){}

    
}
