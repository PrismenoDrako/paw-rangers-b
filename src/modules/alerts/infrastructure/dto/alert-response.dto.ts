import { AlertType } from '../../domain/entities/alert-type.enum';

export class AlertResponseDto {
  id: number;
  speciesId: number;
  breedId: number;
  description: string;
  latitude: number;
  longitude: number;
  date: string;
  userId: number;
  stateId: number;
  type: AlertType;
  images: string[];
  createdAt: string;
  updatedAt: string;

  constructor(alert: any) {
    this.id = alert.id;
    this.speciesId = alert.speciesId;
    this.breedId = alert.breedId;
    this.description = alert.description;
    this.latitude = alert.latitude;
    this.longitude = alert.longitude;

    // Convierte a Date si es string
    this.date = alert.date instanceof Date ? alert.date.toISOString() : new Date(alert.date).toISOString();

    this.userId = alert.userId;
    this.stateId = alert.stateId;
    this.type = alert.type;
    this.images = alert.images.map((img: any) => img.url || img);

    // Convierte createdAt y updatedAt a Date si es string
    this.createdAt = alert.createdAt instanceof Date
      ? alert.createdAt.toISOString()
      : new Date(alert.createdAt).toISOString();

    this.updatedAt = alert.updatedAt instanceof Date
      ? alert.updatedAt.toISOString()
      : new Date(alert.updatedAt).toISOString();
  }
}
