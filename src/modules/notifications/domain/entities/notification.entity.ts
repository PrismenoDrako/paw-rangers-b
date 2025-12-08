/**
 * @module Domain/Entities
 */

export class Notification {
    /**
     * Identificador único de la notificación.
     */
    readonly id: number | null;

    /**
     * Usuario destino de la notificación.
     */
    readonly userId: number;

    /**
     * Título breve de la notificación.
     */
    readonly title: string;

    /**
     * Mensaje descriptivo de la notificación.
     */
    readonly message: string;

    /**
     * URL opcional para que el cliente navegue al detalle de la acción.
     * Ejemplo: /pets/123, /appointments/45, etc.
     */
    readonly url: string | null;

    /**
     * Fecha en que se generó la notificación.
     */
    readonly createdAt: Date;

    /**
     * Indica si el usuario ya vio la notificación.
     */
    isRead: boolean;

    /**
     * Crea una nueva instancia de Notification.
     * @param props Propiedades necesarias para la entidad.
     */
    constructor(props: {
        id?: number | null;
        userId: number;
        title: string;
        message: string;
        url?: string | null;
        createdAt?: Date;
        isRead?: boolean;
    }) {
        this.id = props.id ?? null;
        this.userId = props.userId;
        this.title = props.title;
        this.message = props.message;
        this.url = props.url ?? null;
        this.createdAt = props.createdAt ?? new Date();
        this.isRead = props.isRead ?? false;
    }
}
