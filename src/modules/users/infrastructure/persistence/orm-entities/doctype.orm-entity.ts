import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
/**
 * Entidad ORM que representa un tipo de documento en la base de datos.
 * 
 * Se utiliza en la capa de infraestructura para mapear la tabla `doc_types`
 * mediante TypeORM.
 */
@Entity('doc_types')
export class DocTypeOrmEntity {
	/**
	 * Identificador único del tipo de documento.
	 */
	@PrimaryGeneratedColumn()
	id: number;

	/**
	 * Nombre único del tipo de documento (por ejemplo: "DNI", "Pasaporte").
	 */
	@Column({ unique: true })
	name: string;

	/**
	 * Descripción del tipo de documento.
	 */
	@Column()
	description: string;

	/**
	 * Longitud esperada o máxima del número de documento.
	 */
	@Column()
	length: number;
}