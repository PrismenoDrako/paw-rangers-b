/**
 * DTO utilizado como respuesta estándar al consultar o listar usuarios.
 *
 * Este objeto representa una proyección de la entidad `User` lista para enviarse
 * fuera de la capa de aplicación (por ejemplo, hacia una API o servicio externo).
 */
export interface UserResponseDto {
	/** Identificador único del usuario. */
	id: number;

	/** Nombre de usuario. */
	username: string;

	/** Correo electrónico del usuario. */
	email: string;

	/** Nombres de pila del usuario. */
	name: string;

	/** Primer apellido del usuario. */
	lastName1: string;

	/** Segundo apellido del usuario (opcional). */
	lastName2?: string;

	/** Tipo de documento asociado (nombre y código). */
	docType?: {
		id: number;
		name: string;
		description: string;
		length: number;
	};

	/** Número de documento del usuario (opcional). */
	docNumber?: string;

	/** Dirección física del usuario (opcional). */
	address?: string;

	/** Identificador del rol asociado (opcional). */
	roleId?: number;

	/** Indica si el usuario está activo dentro del sistema. */
	isActive: boolean;
}