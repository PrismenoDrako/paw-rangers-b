import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DocTypeOrmEntity } from "./../modules/users/infrastructure/persistence/orm-entities/doctype.orm-entity";
import { DatabaseInitializerService } from './database-initializer.service';
import { RoleOrmEntity } from '../modules/users/infrastructure/persistence/orm-entities/role.orm-entity';
import { UserOrmEntity } from '../modules/users/infrastructure/persistence/orm-entities/user.orm-entity';

@Module({
    imports: [TypeOrmModule.forFeature([DocTypeOrmEntity, RoleOrmEntity, UserOrmEntity])],
    providers: [DatabaseInitializerService],
})
export class DatabaseModule {}
