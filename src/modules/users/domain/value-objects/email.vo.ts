/**
 * Value Object que representa una dirección de correo electrónico válida.
 * 
 * Esta clase asegura que el valor asignado cumpla con el formato estándar de email.
 * Los Value Objects son inmutables y sólo pueden ser creados a través de su método estático `create()`.
 *
 * @example
 * ```ts
 * const email = Email.create('usuario@ejemplo.com');
 * console.log(email.getValue()); // 'usuario@ejemplo.com'
 * ```
 */
export class Email {
	/**
	 * Constructor privado para evitar instanciación directa.
	 * Usa {@link Email.create} para crear una instancia válida.
	 * 
	 * @param value - Cadena que representa la dirección de correo electrónico.
	 */
	private constructor(private readonly value: string) {}

	/**
	 * Crea una nueva instancia de {@link Email} validando su formato.
	 * 
	 * @param value - Dirección de correo electrónico a validar.
	 * @throws {Error} Si el formato del email no es válido.
	 * @returns Una instancia inmutable de {@link Email}.
	 */
	public static create(value: string): Email {
		if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
			throw new Error('Invalid email format');
		}
		return new Email(value);
	}

	/**
	 * Devuelve el valor del email como una cadena de texto.
	 * 
	 * @returns El email almacenado en formato string.
	 */
	public getValue(): string {
		return this.value;
	}
}