import { DocType } from "src/modules/users/domain/entities/doctype.entity";
import { IDocTypeRepository } from "src/modules/users/domain/repositories/doctype.repository";

/**
 * Caso de uso: Obtener un tipo de documento por ID.
 */
export class GetDocTypeByIdUseCase {
	constructor(private readonly docTypeRepository: IDocTypeRepository) {}

	/**
	 * Devuelve el tipo de documento solicitado.
	 *
	 * @param id Identificador único del tipo de documento.
	 * @throws {Error} Si no se encuentra.
	 */
	async execute(id: number): Promise<DocType> {
		const docType = await this.docTypeRepository.findById(id);
		if (!docType) {
			throw new Error(`No se encontró el tipo de documento con id ${id}`);
		}
		return docType;
	}
}