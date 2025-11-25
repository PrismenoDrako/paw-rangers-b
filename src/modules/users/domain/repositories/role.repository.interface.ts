import { Role } from "../entities/role.entity";

/**
 * Contrato del repositorio de roles dentro del dominio.
 *
 * Define las operaciones principales de persistencia y consulta
 * relacionadas con la entidad `Role`, sin depender de una implementación específica.
 */
export interface IRoleRepository {
	/**
	 * Guarda un rol en el repositorio.
	 * Si el rol ya existe, se actualiza; si no, se crea uno nuevo.
	 *
	 * @param role Entidad de dominio `Role` a guardar.
	 * @returns La entidad `Role` persistida.
	 */
	save(role: Role): Promise<Role>;

	/**
	 * Busca un rol por su identificador único.
	 *
	 * @param id Identificador del rol.
	 * @returns La entidad `Role` encontrada o `null` si no existe.
	 */
	findById(id: number): Promise<Role | null>;

	/**
	 * Busca un rol por su nombre único.
	 *
	 * @param name Nombre del rol.
	 * @returns La entidad `Role` encontrada o `null` si no existe.
	 */
	findByName(name: string): Promise<Role | null>;

	/**
	 * Obtiene todos los roles registrados.
	 *
	 * @returns Una lista de entidades `Role`.
	 */
	findAll(): Promise<Role[]>;

	/**
	 * Elimina un rol del repositorio por su identificador.
	 *
	 * @param id Identificador del rol a eliminar.
	 */
	delete(id: number): Promise<void>;
}
