/**
 * Data Transfer Object (DTO) utilizado para crear un nuevo tipo de documento (`DocType`).
 *
 * Este DTO define los datos requeridos para registrar un nuevo tipo de documento
 * dentro del sistema. Todos los campos son obligatorios.
 *
 * @example
 * ```typescript
 * const dto: CreateDocTypeDto = {
 *   name: 'DNI',
 *   description: 'Documento Nacional de Identidad',
 *   length: 8
 * };
 * ```
 */
export interface CreateDocTypeDto {
	/**
	 * Nombre único del tipo de documento (por ejemplo: `"DNI"`, `"Pasaporte"`, `"RUC"`).
	 */
	name: string;

	/**
	 * Descripción detallada del tipo de documento.
	 */
	description: string;

	/**
	 * Longitud esperada del número de documento (por ejemplo, `8` para DNI o `11` para RUC).
	 */
	length: number;
}