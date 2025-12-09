import { UserLocation } from "../../../domain/entities/user-location.entity";
import { UserLocationRepository } from "../../../domain/repositories/user-location.repository";
import { InjectRepository } from "@nestjs/typeorm";
import { UserLocationOrmEntity } from "../orm-entities/user-location.orm.entity";
import { Repository } from "typeorm";
import { UserLocationMapper } from "../mappers/user-location.orm-mapper";


export class UserLocationOrmRepository extends UserLocationRepository {

    constructor(
        @InjectRepository(UserLocationOrmEntity)
        private readonly userLocationRepository: Repository<UserLocationOrmEntity>
    ) {
        super();
    }

    async findByUserId(userId: number): Promise<UserLocation[]> {
        const userLocations = (await this.userLocationRepository.find({ where: { user: { id: userId } }, relations: ['user'] },));
        return userLocations.map(ul => UserLocationMapper.toDomain(ul));
    }
    async create(location: UserLocation): Promise<UserLocation> {
        const ormEntity = UserLocationMapper.toOrmEntity(location);
        ormEntity.user = { id: location.userId } as any;
        const locationSaved = await this.userLocationRepository.save(ormEntity);
        return  UserLocationMapper.toDomain(locationSaved);

    }
    async delete(id: number, userId: number): Promise<boolean> {
        const result = await this.userLocationRepository.delete({ id, user: { id: userId } });
        return result!.affected! > 0;
    }

}