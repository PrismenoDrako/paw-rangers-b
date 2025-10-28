/**
 * Data Transfer Object (DTO) para representar un rol de usuario (`Role`).
 *
 * Este DTO se utiliza para exponer información de un rol
 * entre la capa de aplicación y los controladores o servicios externos.
 *
 * @example
 * ```typescript
 * const dto: RoleDto = {
 *   id: 1,
 *   name: 'Admin',
 *   isCollaborator: true
 * };
 * ```
 */
export interface RoleDto {
	/**
	 * Identificador único del rol.
	 */
	id: number;

	/**
	 * Nombre del rol (por ejemplo: `"Admin"`, `"Cliente"`, `"Moderador"`).
	 */
	name: string;

	/**
	 * Indica si el rol pertenece a un colaborador interno del sistema.
	 */
	isCollaborator: boolean;
}