/**
 * Representa un tipo de documento de identidad dentro del dominio.
 *
 * A diferencia de su versión como Value Object, esta clase se comporta
 * como una **entidad** porque posee un identificador único (`id`) que
 * la distingue dentro del sistema (por ejemplo, en la base de datos).
 *
 * Cada tipo de documento define una longitud esperada para los números
 * de documento asociados (por ejemplo, un DNI tiene 8 dígitos, un RUC tiene 11).
 *
 * @example
 * ```typescript
 * const dni = new DocType(1, 'DNI', 'Documento Nacional de Identidad', 8);
 * dni.validateNumber('12345678'); // ✅ válido
 * dni.validateNumber('1234');     // ❌ lanza Error
 * ```
 */
export class DocType {
	/**
	 * Crea una nueva instancia de `DocType`.
	 *
	 * @param id Identificador único del tipo de documento (entero autoincremental).
	 * @param name Nombre del tipo de documento (por ejemplo: `"DNI"`, `"Pasaporte"`, `"RUC"`).
	 * @param description Descripción del tipo de documento.
	 * @param length Longitud esperada del número de documento.
	 */
	constructor(
		public readonly id: number,
		public readonly name: string,
		public readonly description: string,
		public readonly length: number,
	) {}

	/**
	 * Valida que el número de documento cumpla con la longitud definida
	 * por este tipo de documento.
	 *
	 * @param number Número de documento a validar.
	 * @throws {Error} Si la longitud del número no coincide con la esperada.
	 *
	 * @example
	 * ```typescript
	 * const passport = new DocType(2, 'Pasaporte', 'Documento internacional', 9);
	 * passport.validateNumber('123456789'); // ✅ válido
	 * passport.validateNumber('12345'); // ❌ lanza Error
	 * ```
	 */
	validateNumber(number: string): void {
		if (number.length !== this.length) {
			throw new Error(`El número de documento debe tener ${this.length} caracteres`);
		}
	}
}