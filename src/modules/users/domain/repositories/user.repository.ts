import { UserResponseDto } from "../../application/dto/user/user-response.dto";
import { User } from "../entities/user.entity";
import { Email } from "../value-objects/email.vo";

/**
 * Interfaz que define el contrato del repositorio de usuarios dentro del dominio.
 *
 * Esta interfaz abstrae las operaciones de persistencia relacionadas con la entidad `User`,
 * permitiendo que la capa de dominio no dependa de una implementación específica
 * (por ejemplo, TypeORM, Prisma, Sequelize, etc.).
 *
 * @example
 * ```typescript
 * const user = await userRepository.findByEmail(Email.create('example@example.com'));
 * if (user) {
 *   console.log(user.name);
 * }
 * ```
 */
export abstract class IUserRepository {
	/**
	 * Guarda un usuario en el repositorio.
	 * Si el usuario ya existe, se actualiza; si no, se crea uno nuevo.
	 *
	 * @param user Entidad de dominio `User` a guardar.
	 * @returns La entidad `User` persistida.
	 */
	abstract save(user: User): Promise<User>;

	/**
	 * Busca un usuario por su identificador único.
	 *
	 * @param id Identificador del usuario.
	 * @returns La entidad `User` encontrada o `null` si no existe.
	 */
	abstract findById(id: number): Promise<User>;

	/**
	 * Busca un usuario por su nombre de usuario.
	 *
	 * @param username Nombre de usuario único.
	 * @returns La entidad `User` encontrada o `null` si no existe.
	 */
	abstract findByUsername(username: string): Promise<User>;

	/**
	 * Busca un usuario por su dirección de correo electrónico.
	 *
	 * @param email Value Object `Email` del usuario.
	 * @returns La entidad `User` encontrada o `null` si no existe.
	 */
	abstract findByEmail(email: Email): Promise<User | null>;

	/**
	 * Busca un usuario por su nombre de usuario o correo electrónico.
	 *
	 * @param username Nombre de usuario.
	 * @param email Value Object `Email` del usuario.
	 * @returns La entidad `User` encontrada o `null` si no existe.
	 */
	abstract findByUsernameOrEmail(username: string, email: Email): Promise<User | null>;

	/**
	 * Obtiene todos los usuarios registrados.
	 *
	 * @returns Una lista de entidades `User`.
	 */
	abstract findAll(): Promise<User[]>;

	/**
	 * Elimina un usuario del repositorio por su identificador.
	 *
	 * @param id Identificador del usuario a eliminar.
	 */
	abstract delete(id: number): Promise<void>;
}