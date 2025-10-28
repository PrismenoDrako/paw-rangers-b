/**
 * DTO utilizado para cambiar la contraseña de un usuario.
 *
 * Este objeto se utiliza como entrada para el caso de uso `ChangePasswordUseCase`.
 */
export interface ChangePasswordDto {
	/** Identificador único del usuario que cambia su contraseña. */
	userId: number;

	/** Contraseña actual en texto plano. */
	currentPassword: string;

	/** Nueva contraseña en texto plano. */
	newPassword: string;
}