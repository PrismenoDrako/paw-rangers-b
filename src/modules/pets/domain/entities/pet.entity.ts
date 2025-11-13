import { PetImage } from "./pet-image.entity";

/**
 * Entidad de dominio que representa una mascota registrada en el sistema.
 *
 * Esta clase pertenece al dominio y modela la información esencial de una mascota
 * sin depender de detalles de infraestructura o base de datos.
 */
export class Pet {
    /**
     * Crea una nueva instancia de la entidad `Pet`.
     *
     * @param id - Identificador único de la mascota.
     * @param name - Nombre de la mascota.
     * @param age - Edad de la mascota (en años o meses, según la configuración del sistema).
     * @param speciesId - Identificador de la especie a la que pertenece la mascota.
     * @param breedId - Identificador de la raza de la mascota.
     * @param userId - Identificador del usuario propietario de la mascota.
     * @param isActive - Indica si la mascota está activa en el sistema.
     */
    constructor(
        public readonly id: number,
        public readonly name: string,
        public age: number,
        public speciesId: number,
        public breedId: number,
        public userId: number,
        public isActive: boolean,
        public images: PetImage[] = [],
    ) {}


    static create(props: Partial<Pet>): Pet {
		return new Pet(
			props.id ?? 0,
			props.name ?? '',
			props.age ?? 0,
			props.speciesId ?? 0,
			props.breedId ?? 0,
			props.userId ?? 0,
			props.isActive ?? true,
			props.images ?? [],
		);
	}
}