/**
 * Data Transfer Object (DTO) para representar un tipo de documento (`DocType`) existente.
 *
 * Este DTO se utiliza principalmente para transferir datos desde la capa de aplicación
 * hacia el frontend o la capa de infraestructura (por ejemplo, controladores REST).
 *
 * @example
 * ```typescript
 * const dto: DocTypeDto = {
 *   id: 1,
 *   name: 'DNI',
 *   description: 'Documento Nacional de Identidad',
 *   length: 8
 * };
 * ```
 */
export interface DocTypeDto {
	/**
	 * Identificador único del tipo de documento.
	 */
	id: number;

	/**
	 * Nombre del tipo de documento (por ejemplo: `"DNI"`, `"Pasaporte"`, `"RUC"`).
	 */
	name: string;

	/**
	 * Descripción detallada del tipo de documento.
	 */
	description: string;

	/**
	 * Longitud esperada del número de documento.
	 */
	length: number;
}
