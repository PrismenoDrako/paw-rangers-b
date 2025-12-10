import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DocTypeOrmEntity } from "./../modules/users/infrastructure/persistence/orm-entities/doctype.orm-entity";
import { DatabaseInitializerService } from './database-initializer.service';
import { RoleOrmEntity } from '../modules/users/infrastructure/persistence/orm-entities/role.orm-entity';
import { UserOrmEntity } from '../modules/users/infrastructure/persistence/orm-entities/user.orm-entity';
import { SpeciesOrmEntity } from '../modules/pets/infrastructure/persistence/orm-entities/species.orm-entity';
import { BreedOrmEntity } from '../modules/pets/infrastructure/persistence/orm-entities/breed.orm-entity';
import { AlertStateOrmEntity } from '../modules/alerts/infrastructure/persistence/orm-entities/alert-state.orm-entity';

@Module({
    imports: [TypeOrmModule.forFeature([DocTypeOrmEntity, RoleOrmEntity, UserOrmEntity, SpeciesOrmEntity, BreedOrmEntity, AlertStateOrmEntity])],
    providers: [DatabaseInitializerService],
})
export class DatabaseModule {}
