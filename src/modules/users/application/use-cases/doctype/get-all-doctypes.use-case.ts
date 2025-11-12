import { Inject } from "@nestjs/common";
import { DocType } from "./../../../domain/entities/doctype.entity";
import { IDocTypeRepository } from "../../../domain/repositories/doctype.repository";

/**
 * Caso de uso: Listar todos los tipos de documento disponibles.
 */
export class GetAllDocTypesUseCase {
	constructor(@Inject(IDocTypeRepository)
    private readonly docTypeRepository: IDocTypeRepository) {}

	/**
	 * Devuelve una lista completa de tipos de documento.
	 */
	async execute(): Promise<DocType[]> {
		return await this.docTypeRepository.findAll();
	}
}