import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserOrmEntity } from '../modules/users/infrastructure/persistence/orm-entities/user.orm-entity';
import { AlertOrmEntity } from '../modules/alerts/infrastructure/persistence/orm-entities/alert.orm-entity';
import { PetOrmEntity } from '../modules/pets/infrastructure/persistence/orm-entities/pet.orm-entity';
import { AlertStateOrmEntity } from '../modules/alerts/infrastructure/persistence/orm-entities/alert-state.orm-entity';
import { BcryptPasswordHasher } from '../modules/users/infrastructure/services/hasher.service';
import { RoleOrmEntity } from '../modules/users/infrastructure/persistence/orm-entities/role.orm-entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([UserOrmEntity, PetOrmEntity, AlertOrmEntity, AlertStateOrmEntity, RoleOrmEntity])
  ],
  providers: [SeedService, BcryptPasswordHasher],
  exports: [SeedService]
})
export class SeedModule {}