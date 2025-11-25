import { UserLocation } from '../entities/user-location.entity';

/**
 * Repositorio de ubicaciones frecuentes de un usuario.
 * 
 * Define las operaciones que la capa de dominio y aplicación necesitan,
 * sin depender de ningún ORM ni detalles de infraestructura.
 */
export abstract class UserLocationRepository {

    /**
     * Obtiene todas las ubicaciones frecuentes del usuario.
     * @param userId Identificador del usuario propietario
     */
    abstract findByUserId(userId: number): Promise<UserLocation[]>;

    /**
     * Crea una nueva ubicación de usuario.
     * @param location Entidad de ubicación a crear
     */
    abstract create(location: UserLocation): Promise<UserLocation>;

    /**
     * Elimina una ubicación por ID.
     * @param id Identificador de la ubicación
     * @param userId Se asegura de que la ubicación pertenezca al usuario
     */
    abstract delete(id: number, userId: number): Promise<boolean>;
}