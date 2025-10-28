/**
 * Representa un rol dentro del dominio.
 *
 * Un rol define el nivel de acceso o tipo de usuario dentro del sistema.
 * Puede corresponder a un colaborador (como administrador o moderador)
 * o a un usuario regular.
 *
 * @example
 * ```typescript
 * const role = new Role(1, 'Admin', true);
 * console.log(role.name); // 'Admin'
 * ```
 */
export class Role {
	/**
	 * Crea una nueva instancia de `Role`.
	 *
	 * @param id Identificador único del rol (entero autoincremental).
	 * @param name Nombre del rol (por ejemplo, "Admin", "Cliente").
	 * @param isCollaborator Indica si el rol pertenece a un colaborador interno del sistema.
	 */
	constructor(
		public readonly id: number,
		public readonly name: string,
		public readonly isCollaborator: boolean = false,
	) {}
}