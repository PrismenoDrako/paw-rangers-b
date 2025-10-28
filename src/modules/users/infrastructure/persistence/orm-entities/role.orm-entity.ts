import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

/**
 * Representa la entidad ORM de un rol dentro del sistema.
 * 
 * Esta clase se utiliza exclusivamente en la capa de infraestructura
 * para mapear la tabla `roles` de la base de datos mediante TypeORM.
 */
@Entity('roles')
export class RoleOrmEntity {
	/**
	 * Identificador único del rol.
	 */
	@PrimaryGeneratedColumn()
	id: number;

	/**
	 * Nombre único que identifica el rol (por ejemplo: "admin", "user").
	 */
	@Column({ unique: true })
	name: string;

	/**
	 * Indica si el rol pertenece a un colaborador del sistema
	 * (como moderador o administrador).
	 */
	@Column({ default: false })
	isCollaborator: boolean;
}