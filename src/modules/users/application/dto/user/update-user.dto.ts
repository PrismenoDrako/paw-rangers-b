/**
 * DTO utilizado para actualizar los datos de un usuario existente.
 *
 * Este objeto se utiliza como entrada para el caso de uso `UpdateUserUseCase`.
 * Permite modificar solo los campos editables de la entidad `User`.
 */
export interface UpdateUserDto {
	/** Nombres de pila del usuario (opcional). */
	name?: string;

	/** Primer apellido del usuario (opcional). */
	lastName1?: string;

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

	/** Estado de actividad del usuario (opcional). */
	isActive?: boolean;
}