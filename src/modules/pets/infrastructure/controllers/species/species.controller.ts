import { Controller, Get, Param } from '@nestjs/common';
import { GetAllSpeciesUseCase } from '../../../../../modules/pets/application/use-cases/species/get-all-species.use-case';
import { Species } from '../../../domain/entities/species.entity';

@Controller('species')
export class SpeciesController {
    constructor(
        private readonly getAllSpeciesUseCase: GetAllSpeciesUseCase
    ) { }

    @Get()
    async findAll(): Promise<Species[]> {
        return await this.getAllSpeciesUseCase.execute();
    }

    // @Get(':id')
    // async findOne(@Param('id') id: number): Promise<Species> {
    //     return this.speciesRepo.findById(id); // si agregas método findById en repo
    // }

    // @Post()
    // async create(@Body() dto: CreateSpeciesDto): Promise<Species> {
    //     const species = new Species(0, dto.name, dto.scientificName);
    //     return this.speciesRepo.save(species);
    // }

    // @Put(':id')
    // async update(@Param('id') id: number, @Body() dto: UpdateSpeciesDto): Promise<Species> {
    //     const species = new Species(id, dto.name, dto.scientificName);
    //     return this.speciesRepo.update(species);
    // }

    // @Delete(':id')
    // async remove(@Param('id') id: number): Promise<{ success: boolean }> {
    //     const success = await this.speciesRepo.delete(id);
    //     return { success };
    // }
}