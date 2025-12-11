import { AlertOrmEntity } from '../persistence/orm-entities/alert.orm-entity';

export class AlertDetailResponseDto {
    id: number;
    description: string;
    date: Date;
    latitude: number;
    longitude: number;
    state: string;
    species: string;
    breed: string;
    images: string[];
    user: {
        id: number;
        name: string;
        lastName1: string;
        lastName2?: string;
    };

    constructor(alert: AlertOrmEntity) {
        this.id = alert.id;
        this.description = alert.description;
        this.date = alert.date;
        this.latitude = alert.latitude;
        this.longitude = alert.longitude;
        this.state = alert.state?.name;
        this.species = alert.species?.name;
        this.breed = alert.breed?.name;
        this.images = alert.images?.map(img => img.url) || [];
        this.user = {
            id: alert.user.id,
            name: alert.user.name,
            lastName1: alert.user.lastName1,
            lastName2: alert.user.lastName2
        };
    }
}
