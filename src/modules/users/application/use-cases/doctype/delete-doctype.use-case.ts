import { IDocTypeRepository } from "src/modules/users/domain/repositories/doctype.repository.interface";

/**
 * Caso de uso: Eliminar un tipo de documento.
 */
export class DeleteDocTypeUseCase {
	constructor(private readonly docTypeRepository: IDocTypeRepository) {}

	/**
	 * Elimina un tipo de documento por su identificador.
	 *
	 * @param id Identificador del tipo de documento a eliminar.
	 * @throws {Error} Si no se encuentra el tipo de documento.
	 */
	async execute(id: number): Promise<void> {
		const existing = await this.docTypeRepository.findById(id);
		if (!existing) {
			throw new Error(`No se encontró el tipo de documento con id ${id}`);
		}

		await this.docTypeRepository.delete(id);
	}
}