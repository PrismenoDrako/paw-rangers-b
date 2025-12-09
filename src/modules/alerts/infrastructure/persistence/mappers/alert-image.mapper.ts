import { AlertImage } from '../../../domain/entities/alert-image.entity';
import { AlertImageOrmEntity } from '../orm-entities/alert-image.orm-entity';

export class AlertImageMapper {

    static toDomain(entity: AlertImageOrmEntity): AlertImage {

        return {
            id: entity.id,
            alertId: entity.alertId,
            url: entity.url,
            order: entity.order,
        };
    }

    static toOrm(domain: AlertImage): AlertImageOrmEntity {
        const orm = new AlertImageOrmEntity();

        orm.id = domain.id;
        orm.alertId = domain.alertId;
        orm.url = domain.url;
        orm.order = domain.order;

        return orm;
    }
}
