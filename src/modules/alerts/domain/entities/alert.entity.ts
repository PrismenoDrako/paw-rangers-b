import { AlertImage } from "./alert-image.entity";
import { AlertType } from "./alert-type.enum";

export class Alert {
    id: number;
    speciesId: number;
    breedId: number;
    description: string;
    latitude: number;
    longitude: number;
    date: Date;           // siempre Date en el dominio
    userId: number;
    stateId: number;
    type: AlertType;
    images?: AlertImage[]; // colección opcional
    createdAt: Date;
    updatedAt: Date;
}