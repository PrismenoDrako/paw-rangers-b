import { Injectable } from "@nestjs/common";
import { Role } from "../../../domain/entities/role.entity";
import { IRoleRepository } from "../../../domain/repositories/role.repository";
import { RoleOrmMapper } from "../mappers/role.orm-mapper";
import { RoleOrmEntity } from "../orm-entities/role.orm-entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class RoleRepository extends IRoleRepository {

    constructor(
        @InjectRepository(RoleOrmEntity)
        private readonly repository: Repository<RoleOrmEntity>,
    ) {
        super();
    }
    save(role: Role): Promise<Role> {
        throw new Error("Method not implemented.");
    }
    findById(id: number): Promise<Role | null> {
        throw new Error("Method not implemented.");
    }
    findByName(name: string): Promise<Role | null> {
        throw new Error("Method not implemented.");
    }
    async findAll(): Promise<Role[]> {
        const ormEntities = await this.repository.find();
        return ormEntities.map(entity => RoleOrmMapper.toDomain(entity));
    }
    delete(id: number): Promise<void> {
        throw new Error("Method not implemented.");
    }

}