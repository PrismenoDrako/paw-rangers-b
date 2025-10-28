import { DocType } from "src/modules/users/domain/entities/doctype.entity";
import { IDocTypeRepository } from "src/modules/users/domain/repositories/doctype.repository.interface";

/**
 * Caso de uso: Listar todos los tipos de documento disponibles.
 */
export class GetAllDocTypesUseCase {
	constructor(private readonly docTypeRepository: IDocTypeRepository) {}

	/**
	 * Devuelve una lista completa de tipos de documento.
	 */
	async execute(): Promise<DocType[]> {
		return await this.docTypeRepository.findAll();
	}
}