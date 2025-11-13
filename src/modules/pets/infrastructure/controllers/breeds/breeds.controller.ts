import { Controller, Get } from '@nestjs/common';
import { GetAllBreedsUseCase } from '../../../application/use-cases/breed/get-all-breeds.use-case';
import { Breed } from '../../../domain/entities/breed.entity';

@Controller('breeds')
export class BreedsController {

    constructor(
        private readonly getAllBreedsUseCase: GetAllBreedsUseCase
    ) { }

    @Get()
    async findAll(): Promise<Breed[]> {
        return await this.getAllBreedsUseCase.execute();
    }

}
