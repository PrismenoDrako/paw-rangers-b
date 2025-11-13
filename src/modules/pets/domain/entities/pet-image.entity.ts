/**
 * Entidad de dominio que representa una imagen asociada a una mascota.
 *
 * Esta clase pertenece a la capa de dominio y modela la información esencial
 * de una imagen sin depender de la infraestructura o del ORM.
 */
export class PetImage {
    /**
     * Crea una nueva instancia de la entidad `PetImage`.
     *
     * @param id - Identificador único de la imagen.
     * @param petId - Identificador de la mascota a la que pertenece la imagen.
     * @param url - URL o ruta donde se encuentra la imagen almacenada.
     * @param description - Descripción opcional de la imagen.
     * @param isMain - Indica si la imagen es la principal de la mascota.
     */
    constructor(
        public readonly id: number,
        public readonly petId: number,
        public readonly url: string,
        public readonly description?: string,
        public readonly isMain: boolean = false,
    ) {}
}