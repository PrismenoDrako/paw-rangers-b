import { Email } from "../value-objects/email.vo";
import { Password } from "../value-objects/password.vo";

/**
 * Representa un usuario dentro del dominio.
 *
 * Esta clase modela los datos y relaciones principales de un usuario,
 * incluyendo sus datos personales, credenciales y relación con un rol.
 *
 * @example
 * ```typescript
 * const user = new User(
 *   10,
 *   'user123',
 *   Password.create('hashed_password'),
 *   Email.create('johndoe@example.com'),
 *   'John',
 *   'Doe',
 *   undefined,
 *   DocType.create('DNI', 'Documento Nacional de Identidad', 8),
 *   '12345678',
 *   'Av. Los Pinos 123',
 *   2,
 *   true
 * );
 * ```
 */
export class User {
	/**
	 * Crea una nueva instancia de `User`.
	 *
	 * @param id Identificador único del usuario (entero autoincremental en la base de datos).
	 * @param username Nombre de usuario único utilizado para autenticación.
	 * @param password Value Object que representa el hash de la contraseña.
	 * @param email Value Object que representa el correo electrónico del usuario.
	 * @param name Nombres de pila del usuario.
	 * @param lastName1 Primer apellido del usuario.
	 * @param lastName2 Segundo apellido del usuario (opcional).
	 * @param docType Value Object que representa el tipo de documento (por ejemplo, DNI, pasaporte).
	 * @param docNumber Número de documento del usuario (opcional).
	 * @param address Dirección física del usuario (opcional).
	 * @param roleId Identificador del rol asociado al usuario (entero, opcional).
	 * @param isActive Indica si el usuario está activo dentro del sistema (por defecto, `true`).
	 */
	constructor(
		public readonly id: number,
		public readonly username: string,
		public password: Password,
		public email: Email,
		public name: string,
		public lastName1: string,
		public lastName2?: string,
		public docTypeId?: number,
		public docNumber?: string,
		public phone?: string,
		public address?: string,
		public roleId?: number,
		public isActive: boolean = true,
	) {}

	/**
	 * Desactiva el usuario dentro del dominio.
	 */
	deactivate(): void {
		this.isActive = false;
	}

	/**
	 * Reactiva el usuario dentro del dominio.
	 */
	activate(): void {
		this.isActive = true;
	}
}