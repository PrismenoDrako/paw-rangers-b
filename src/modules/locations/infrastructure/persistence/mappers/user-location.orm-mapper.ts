import { UserLocation } from '../../../domain/entities/user-location.entity';
import { UserLocationOrmEntity } from '../orm-entities/user-location.orm.entity';

/**
 * Mapper responsable de convertir entre:
 *  - Entidad de dominio `UserLocation`
 *  - Entidad ORM `UserLocationOrmEntity`
 *
 * Este mapper garantiza que la capa de dominio permanezca completamente
 * desacoplada de TypeORM y de la infraestructura de persistencia.
 */
export class UserLocationMapper {

    /**
     * Convierte una entidad ORM (`UserLocationOrmEntity`) en una entidad de dominio (`UserLocation`).
     *
     * @param orm Entidad ORM proveniente de la base de datos
     * @returns Instancia de la entidad de dominio `UserLocation`
     */
    static toDomain(orm: UserLocationOrmEntity): UserLocation {
        return new UserLocation({
            id: orm.id,
            userId: orm.user?.id ?? 0, // fallback por si user no está cargado
            name: orm.name,
            latitude: orm.latitude,
            longitude: orm.longitude,
            radius: orm.radius,
            createdAt: orm.createdAt,
        });
    }

    /**
     * Convierte una entidad de dominio (`UserLocation`) en una entidad ORM (`UserLocationOrmEntity`).
     *
     * Esta conversión se usa para crear nuevas ubicaciones o actualizar existentes
     * antes de enviarlas al repositorio TypeORM.
     *
     * @param domain Entidad de dominio que se desea persistir
     * @returns Entidad ORM lista para ser insertada o actualizada
     */
    static toOrmEntity(domain: UserLocation): UserLocationOrmEntity {
        const orm = new UserLocationOrmEntity();

        orm.id = domain.id;
        orm.name = domain.name;
        orm.latitude = domain.latitude;
        orm.longitude = domain.longitude;
        orm.radius = domain.radius;
        orm.createdAt = domain.createdAt;

        /**
         * PostGIS requiere un valor EWKT para columnas `geography(Point)`.
         * Ejemplo: "SRID=4326;POINT(-77.02824 -12.04318)"
         */
        //orm.geom = `SRID=4326;POINT(${domain.longitude} ${domain.latitude})`;

        // Solo asignamos el userId en el campo relacionado cuando sea necesario.
        // El mapper de repositorio debe hacer user: { id: domain.userId }
        
        return orm;
    }

    /**
     * Mezcla una entidad de dominio con una entidad ORM existente.
     *
     * Útil para casos de actualización (`update`), donde TypeORM necesita
     * una entidad existente a la cual aplicar los cambios.
     *
     * @example
     *  const ormEntity = await repo.findOne(id);
     *  const updated = UserLocationMapper.merge(ormEntity, domain);
     *  repo.save(updated);
     *
     * @param orm Entidad ORM existente en base de datos
     * @param domain Entidad de dominio con los datos actualizados
     * @returns La entidad ORM modificada y lista para persistencia
     */
    static merge(orm: UserLocationOrmEntity, domain: UserLocation): UserLocationOrmEntity {
        orm.name = domain.name;
        orm.latitude = domain.latitude;
        orm.longitude = domain.longitude;
        orm.radius = domain.radius;

        orm.geom = `SRID=4326;POINT(${domain.longitude} ${domain.latitude})`;

        return orm;
    }
}
