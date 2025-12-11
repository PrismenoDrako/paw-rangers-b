import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	CreateDateColumn,
	UpdateDateColumn,
	ManyToOne,
	JoinColumn,
} from 'typeorm';
import { DocTypeOrmEntity } from './doctype.orm-entity';
import { RoleOrmEntity } from './role.orm-entity';

/**
 * Entidad ORM que representa un usuario dentro del sistema.
 * 
 * Se utiliza en la capa de infraestructura para mapear la tabla `users`
 * mediante TypeORM. Contiene información personal, credenciales y relaciones
 * con los tipos de documento y roles.
 */
@Entity('users')
export class UserOrmEntity {
	/** Identificador único del usuario. */
	@PrimaryGeneratedColumn()
	id: number;

	/** Nombre de usuario único. */
	@Column({ unique: true })
	username: string;

	/** Contraseña en formato encriptado. */
	@Column()
	password: string;

	/** Correo electrónico único. */
	@Column({ unique: true })
	email: string;

	/** Primer nombre del usuario. */
	@Column()
	name: string;

	/** Primer apellido del usuario. */
	@Column()
	lastName1: string;

	/** Segundo apellido opcional del usuario. */
	@Column({ nullable: true })
	lastName2?: string;

	/** Relación con el tipo de documento del usuario. */
	@ManyToOne(() => DocTypeOrmEntity, { nullable: true })
	@JoinColumn({ name: 'doc_type_id' })
	docType?: DocTypeOrmEntity;

	/** Número de documento de identificación. */
	@Column({ nullable: true, unique: true })
	docNumber?: string;

	/** Dirección del usuario. */
	@Column({ nullable: true })
	address?: string;

	@Column({ nullable: true })
	phone?: string;

	/** Rol asignado al usuario dentro del sistema. */
	@ManyToOne(() => RoleOrmEntity, { nullable: true })
	@JoinColumn({ name: 'role_id' })
	role?: RoleOrmEntity;

	/** Indica si la cuenta del usuario está activa. */
	@Column({ default: true })
	isActive: boolean;

	/** Fecha de creación del registro. */
	@CreateDateColumn()
	createdAt: Date;

	/** Fecha de última actualización del registro. */
	@UpdateDateColumn()
	updatedAt: Date;
}