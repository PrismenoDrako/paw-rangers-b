import { PasswordHasher } from '../services/password-hasher.interface';

/**
 * Value Object que representa una contraseña segura dentro del dominio.
 * 
 * No expone la contraseña en texto plano y solo permite su creación o verificación
 * mediante un `PasswordHasher` inyectado desde fuera del dominio.
 */
export class Password {
    private constructor(private readonly hashedValue: string) {}

    /**
     * Crea una instancia de `Password` desde una contraseña en texto plano.
     *
     * @param plainPassword - Contraseña en texto plano
     * @param hasher - Servicio de hash inyectado
     * @returns Instancia de `Password`
     */
    public static async create(
        plainPassword: string,
        hasher: PasswordHasher
    ): Promise<Password> {
        const hashed = await hasher.hash(plainPassword);
        return new Password(hashed);
    }

    /**
     * Crea una instancia de `Password` desde un hash previamente generado.
     */
    public static fromHash(hashed: string): Password {
        return new Password(hashed);
    }

    /**
     * Verifica si una contraseña en texto plano coincide con el hash interno.
     */
    public async matches(
        plainPassword: string,
        hasher: PasswordHasher
    ): Promise<boolean> {
        return hasher.compare(plainPassword, this.hashedValue);
    }

    /**
     * Devuelve el valor del hash.
     */
    public get value(): string {
        return this.hashedValue;
    }
}