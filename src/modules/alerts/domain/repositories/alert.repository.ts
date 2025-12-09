import { Alert } from "../entities/alert.entity";
import { AlertType } from "../entities/alert-type.enum";

export abstract class AlertRepository {

    /**
     * Crea o actualiza una alerta (incluye imágenes).
     */
    abstract save(alert: Alert): Promise<Alert>;

    /**
     * Obtiene una alerta completa por ID (incluye imágenes).
     */
    abstract findById(id: number): Promise<Alert | null>;

    /**
     * Lista todas las alertas.
     */
    abstract findAll(): Promise<Alert[]>;

    /**
     * Elimina una alerta y sus imágenes asociadas.
     */
    abstract delete(id: number): Promise<void>;

    // ---------------------------------------------------------
    // FILTROS ESPECIALIZADOS
    // ---------------------------------------------------------

    /**
     * Buscar alertas por especie (perro, gato, etc.).
     */
    abstract findBySpecies(speciesId: number): Promise<Alert[]>;

    /**
     * Buscar alertas por raza.
     */
    abstract findByBreed(breedId: number): Promise<Alert[]>;

    /**
     * Buscar alertas por usuario.
     */
    abstract findByUserId(userId: number): Promise<Alert[]>;

    /**
     * Buscar alertas por tipo: lost | found.
     */
    abstract findByType(type: AlertType): Promise<Alert[]>;

    /**
     * Buscar alertas por estado (activo, cerrado, archivado...).
     */
    abstract findByState(stateId: number): Promise<Alert[]>;

    // ---------------------------------------------------------
    // FILTRO AVANZADO: GEOLOCALIZACIÓN
    // ---------------------------------------------------------

    /**
     * Encuentra alertas cercanas a cualquiera de las ubicaciones frecuentes del usuario.
     * No devuelve alertas creadas por el mismo usuario.
     */
    abstract findNearbyForUserId(
        userId: number,
        radius: number,
        includeOwnAlerts?: boolean
    ): Promise<Alert[]>;

    /**
     * Filtro combinado (opcional) si deseas uno más complejo.
     * Permite múltiples criterios.
     */
    abstract search(params: {
        speciesId?: number;
        breedId?: number;
        userId?: number;
        stateId?: number;
        type?: AlertType;
        fromDate?: Date;
        toDate?: Date;
        latitude?: number;
        longitude?: number;
        radius?: number; // metros
    }): Promise<Alert[]>;
}
