import { DocType } from "../entities/doctype.entity";


/**
 * Contrato del repositorio de tipos de documento dentro del dominio.
 *
 * Define las operaciones principales de persistencia y consulta
 * relacionadas con la entidad o value object `DocType`.
 */
export abstract class IDocTypeRepository {
	/**
	 * Guarda un tipo de documento en el repositorio.
	 * Si ya existe, se actualiza; si no, se crea uno nuevo.
	 *
	 * @param docType Value Object `DocType` a guardar.
	 * @returns El `DocType` persistido.
	 */
	abstract save(docType: DocType): Promise<DocType>;

	/**
	 * Busca un tipo de documento por su identificador único.
	 *
	 * @param id Identificador del tipo de documento.
	 * @returns El `DocType` encontrado o `null` si no existe.
	 */
	abstract findById(id: number): Promise<DocType | null>;

	/**
	 * Busca un tipo de documento por su nombre único.
	 *
	 * @param name Nombre del tipo de documento (por ejemplo, "DNI", "Pasaporte").
	 * @returns El `DocType` encontrado o `null` si no existe.
	 */
	abstract findByName(name: string): Promise<DocType | null>;

	/**
	 * Obtiene todos los tipos de documento disponibles.
	 *
	 * @returns Una lista de `DocType`.
	 */
	abstract findAll(): Promise<DocType[]>;

	/**
	 * Elimina un tipo de documento del repositorio por su identificador.
	 *
	 * @param id Identificador del tipo de documento a eliminar.
	 */
	abstract delete(id: number): Promise<void>;
}
