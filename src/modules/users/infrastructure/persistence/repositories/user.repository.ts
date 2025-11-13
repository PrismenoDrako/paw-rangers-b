import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../../../domain/entities/user.entity";
import { IUserRepository } from "../../../domain/repositories/user.repository";
import { Email } from "../../../domain/value-objects/email.vo";
import { UserOrmEntity } from "../orm-entities/user.orm-entity";
import { Repository } from "typeorm";
import { UserOrmMapper } from "../mappers/user.orm-mapper";
import { DocTypeOrmEntity } from "../orm-entities/doctype.orm-entity";
import { RoleOrmEntity } from "../orm-entities/role.orm-entity";

@Injectable()
export class UserRepository extends IUserRepository {

    constructor(
        @InjectRepository(UserOrmEntity)
        private readonly userRepository: Repository<UserOrmEntity>,
        @InjectRepository(RoleOrmEntity)
        private readonly roleRepository: Repository<RoleOrmEntity>,
        @InjectRepository(DocTypeOrmEntity)
        private readonly doctypeRepository: Repository<DocTypeOrmEntity>,
    ) {
        super();
    }

    async save(user: User): Promise<User> {
        const ormUser = UserOrmMapper.toOrmEntity(user);
        const ormRole = await this.roleRepository.findOneBy({id: user.roleId});
        ormUser.role = ormRole ?? undefined;
        return UserOrmMapper.toDomain(await this.userRepository.save(ormUser));
    }
    async findById(id: number): Promise<User> {
        const ormEntity = await this.userRepository.findOneBy({id});
        return UserOrmMapper.toDomain(ormEntity);
    }
    async findByUsername(username: string): Promise<User> {
        const ormUser = await this.userRepository.findOneBy({ username });
        const res = UserOrmMapper.toDomain(ormUser);
        return res;
    }
    findByEmail(email: Email): Promise<User | null> {
        throw new Error("Method not implemented.");
    }
    findByUsernameOrEmail(username: string, email: Email): Promise<User | null> {
        throw new Error("Method not implemented.");
    }
    async findAll(): Promise<User[]> {
        const ormEntities = await this.userRepository.find({ relations: ['role', 'docType']});
        return ormEntities.map( entity => UserOrmMapper.toDomain(entity) );
    }
    delete(id: number): Promise<void> {
        throw new Error("Method not implemented.");
    }

}
