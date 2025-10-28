/**
 * Data Transfer Object (DTO) utilizado para actualizar un tipo de documento existente (`DocType`).
 *
 * Este DTO permite modificar uno o varios campos del tipo de documento.
 * El identificador (`id`) es obligatorio para poder aplicar la actualización.
 *
 * @example
 * ```typescript
 * const dto: UpdateDocTypeDto = {
 *   id: 1,
 *   description: 'Documento Nacional de Identidad actualizado',
 * };
 * ```
 */
export interface UpdateDocTypeDto {
	/**
	 * Identificador único del tipo de documento que se desea actualizar.
	 */
	id: number;

	/**
	 * Nuevo nombre del tipo de documento (opcional).
	 */
	name?: string;

	/**
	 * Nueva descripción detallada (opcional).
	 */
	description?: string;

	/**
	 * Nueva longitud esperada del número de documento (opcional).
	 */
	length?: number;
}
