/**
 * DTO utilizado para crear un nuevo usuario en el sistema.
 *
 * Este objeto se utiliza como entrada para el caso de uso `CreateUserUseCase`.
 * Contiene los datos necesarios para instanciar un nuevo `User` dentro del dominio.
 */
export interface CreateUserDto {
	/** Nombre de usuario único utilizado para autenticación. */
	username: string;

	/** Contraseña en texto plano (será hasheada antes de persistirse). */
	password: string;

	/** Dirección de correo electrónico del usuario. */
	email: string;

	/** Nombres de pila del usuario. */
	name: string;

	/** Primer apellido del usuario. */
	lastName1: string;

	/** Segundo apellido del usuario (opcional). */
	lastName2?: string;

	/** Identificador del tipo de documento (por ejemplo, DNI, pasaporte). */
	docTypeId?: number;

	/** Número de documento (opcional). */
	docNumber?: string;

	/** Dirección física del usuario (opcional). */
	address?: string;

	/** Identificador del rol asociado (opcional). */
	roleId?: number;
}