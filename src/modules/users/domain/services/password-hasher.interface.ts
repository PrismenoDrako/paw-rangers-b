/**
 * Interfaz que define el contrato para los servicios de hash de contraseñas.
 * 
 * Esta interfaz pertenece a la capa de dominio, ya que el dominio necesita
 * saber **qué** debe hacerse (hash/compare), pero no **cómo** (la implementación).
 *
 * Las implementaciones concretas (como bcrypt, Argon2, etc.) se definen
 * en la capa de infraestructura.
 */
export interface PasswordHasher {
    /**
     * Genera un hash a partir de una contraseña en texto plano.
     * 
     * @param plainPassword - Contraseña en texto plano
     * @returns Promesa que resuelve al hash generado
     */
    hash(plainPassword: string): Promise<string>;

    /**
     * Compara una contraseña en texto plano con su hash almacenado.
     * 
     * @param plainPassword - Contraseña en texto plano
     * @param hashedPassword - Hash previamente generado
     * @returns Promesa que indica si las contraseñas coinciden
     */
    compare(plainPassword: string, hashedPassword: string): Promise<boolean>;
}