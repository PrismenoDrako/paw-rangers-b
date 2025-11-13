import { Inject } from "@nestjs/common";
import { PetRepository } from "../../../domain/repositories/pet.repository";
import { Pet } from "../../../domain/entities/pet.entity";
import { StorageService } from "../../../../../modules/storage/storage.service";
import { PetImage } from "../../../domain/entities/pet-image.entity";
import { CreatePetDto } from "../../dto/create-pet.dto";

export class CreatePetUseCase{

    constructor(
        @Inject(PetRepository)
        private readonly petRepository: PetRepository,
        private readonly storageService: StorageService        
    ){}

    async execute(
        petData: CreatePetDto,
        files: Express.Multer.File[]
    ): Promise<Pet>{
        //Subir imágenes al storage
        const images: PetImage[] = [];
        for (const file of files) {
            const url = await this.storageService.uploadFile(file, 'pets'); // carpeta 'pets' en el bucket
            images.push(new PetImage(0, 0, url)); // id y petId se asignarán al guardar en DB
        }

        // 2️⃣ Crear la entidad de dominio
        const pet = new Pet(
            0,
            petData.name,
            petData.age,
            petData.speciesId,
            petData.breedId,
            petData.userId!,
            true,
            images
        );
        return await this.petRepository.save(pet);
    }
}