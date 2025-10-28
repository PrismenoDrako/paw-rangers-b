/**
 * Data Transfer Object (DTO) utilizado para actualizar un rol existente (`Role`).
 *
 * Este DTO permite modificar uno o varios campos de un rol.
 * El identificador (`id`) es obligatorio para aplicar la actualización.
 *
 * @example
 * ```typescript
 * const dto: UpdateRoleDto = {
 *   id: 1,
 *   name: 'Administrador',
 *   isCollaborator: true
 * };
 * ```
 */
export interface UpdateRoleDto {
	/**
	 * Identificador único del rol que se desea actualizar.
	 */
	id: number;

	/**
	 * Nuevo nombre del rol (opcional).
	 */
	name?: string;

	/**
	 * Indica si el rol corresponde a un colaborador interno (opcional).
	 */
	isCollaborator?: boolean;
}