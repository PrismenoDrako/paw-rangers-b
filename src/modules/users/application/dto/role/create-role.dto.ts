/**
 * Data Transfer Object (DTO) utilizado para crear un nuevo rol (`Role`).
 *
 * Este DTO define los datos necesarios para registrar un nuevo rol
 * dentro del sistema.
 *
 * @example
 * ```typescript
 * const dto: CreateRoleDto = {
 *   name: 'Admin',
 *   isCollaborator: true
 * };
 * ```
 */
export interface CreateRoleDto {
	/**
	 * Nombre único del rol (por ejemplo: `"Admin"`, `"Cliente"`, `"Moderador"`).
	 */
	name: string;

	/**
	 * Indica si el rol corresponde a un colaborador interno del sistema.
	 * 
	 * Por defecto suele ser `false`.
	 */
	isCollaborator?: boolean;
}