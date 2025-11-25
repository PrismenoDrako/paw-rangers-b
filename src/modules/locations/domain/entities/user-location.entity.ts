/**
 * Representa una ubicación frecuente de un usuario.
 * 
 * Esta entidad se encarga de almacenar la latitud, longitud, radio de interés
 * y un nombre descriptivo de la ubicación.
 * 
 * Se utiliza en la lógica de negocio para filtrar alertas cercanas a la ubicación del usuario.
 */
export class UserLocation {
    /** Identificador único de la ubicación */
    readonly id: number;

    /** Nombre descriptivo de la ubicación (ej: "Casa", "Trabajo") */
    name: string;
    
    /** Latitud de la ubicación (-90 a 90) */
    latitude: number;

    /** Longitud de la ubicación (-180 a 180) */
    longitude: number;

    /** Radio de interés en metros */
    radius: number;

    /** Fecha de creación de la ubicación */
    readonly createdAt: Date;

    /** Identificador del usuario propietario de la ubicación */
    readonly userId: number;

    /**
     * Crea una nueva ubicación de usuario
     * @param props Propiedades de la ubicación
     */
    constructor(props: {
        id?: number;
        userId: number;
        latitude: number;
        longitude: number;
        radius?: number;
        name: string;
        createdAt?: Date;
    }) {
        this.id = props.id ?? 0;
        this.userId = props.userId;
        this.latitude = props.latitude;
        this.longitude = props.longitude;
        this.radius = props.radius ?? 5000;
        this.name = props.name;
        this.createdAt = props.createdAt ?? new Date();

        this.validate();
    }

    /**
     * Valida que las coordenadas, radio y nombre sean correctos
     */
    private validate() {
        if (this.latitude < -90 || this.latitude > 90)
            throw new Error('Latitude must be between -90 and 90');
        if (this.longitude < -180 || this.longitude > 180)
            throw new Error('Longitude must be between -180 and 180');
        if (this.radius <= 0) throw new Error('Radius must be positive');
        if (!this.name || this.name.trim().length === 0)
            throw new Error('Name is required');
    }

    /**
     * Actualiza la ubicación con nuevos valores
     * @param latitude Nueva latitud
     * @param longitude Nueva longitud
     * @param radius Nuevo radio (opcional)
     * @param name Nuevo nombre (opcional)
     */
    updateLocation(latitude: number, longitude: number, radius?: number, name?: string) {
        this.latitude = latitude;
        this.longitude = longitude;
        if (radius) this.radius = radius;
        if (name) this.name = name;
        this.validate();
    }

    /**
     * Calcula la distancia en metros entre esta ubicación y otro punto
     * usando la fórmula de Haversine
     * @param lat Latitud del punto destino
     * @param lng Longitud del punto destino
     * @returns Distancia en metros
     */
    distanceTo(lat: number, lng: number): number {
        const toRad = (x: number) => (x * Math.PI) / 180;
        const R = 6371000; // metros
        const dLat = toRad(lat - this.latitude);
        const dLon = toRad(lng - this.longitude);
        const a =
            Math.sin(dLat / 2) ** 2 +
            Math.cos(toRad(this.latitude)) *
                Math.cos(toRad(lat)) *
                Math.sin(dLon / 2) ** 2;
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
    }
}
