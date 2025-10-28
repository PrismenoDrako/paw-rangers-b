import { IDocTypeRepository } from "src/modules/users/domain/repositories/doctype.repository.interface";
import { CreateDocTypeDto } from "../../dto/doctype/create-doctype.dto";
import { DocType } from "src/modules/users/domain/entities/doctype.entity";


/**
 * Caso de uso: Crear un nuevo tipo de documento.
 *
 * Se encarga de validar que el nombre del tipo de documento
 * no exista previamente y de persistirlo a través del repositorio.
 */
export class CreateDocTypeUseCase {
	constructor(private readonly docTypeRepository: IDocTypeRepository) {}

	/**
	 * Ejecuta la creación del tipo de documento.
	 *
	 * @param dto Datos necesarios para crear el tipo de documento.
	 * @throws {Error} Si el nombre ya existe.
	 * @returns El `DocType` recién creado.
	 */
	async execute(dto: CreateDocTypeDto): Promise<DocType> {
		const existing = await this.docTypeRepository.findByName(dto.name);
		if (existing) {
			throw new Error(`El tipo de documento "${dto.name}" ya existe.`);
		}

		const docType = new DocType(0, dto.name, dto.description, dto.length);
		return await this.docTypeRepository.save(docType);
	}
}