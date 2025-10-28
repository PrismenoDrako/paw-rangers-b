import { DocType } from "src/modules/users/domain/entities/doctype.entity";
import { IDocTypeRepository } from "src/modules/users/domain/repositories/doctype.repository.interface";
import { UpdateDocTypeDto } from "../../dto/doctype/update-doctype.dto";


/**
 * Caso de uso: Actualizar un tipo de documento existente.
 */
export class UpdateDocTypeUseCase {
	constructor(private readonly docTypeRepository: IDocTypeRepository) {}

	/**
	 * Actualiza un tipo de documento en base a su identificador.
	 *
	 * @param id Identificador del tipo de documento a actualizar.
	 * @param dto Datos a modificar.
	 * @throws {Error} Si no se encuentra el tipo de documento.
	 * @returns El `DocType` actualizado.
	 */
	async execute(id: number, dto: UpdateDocTypeDto): Promise<DocType> {
		const existing = await this.docTypeRepository.findById(id);
		if (!existing) {
			throw new Error(`No se encontró el tipo de documento con id ${id}`);
		}

		const updated = new DocType(
			existing.id,
			dto.name ?? existing.name,
			dto.description ?? existing.description,
			dto.length ?? existing.length,
		);

		return await this.docTypeRepository.save(updated);
	}
}