export class CreatePetDto {
    name: string;
    age: number;
    speciesId: number;
    breedId: number;
    userId?: number;
}