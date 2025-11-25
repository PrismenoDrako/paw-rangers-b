import { Module } from '@nestjs/common';
import { UserLocationsController } from './infrastructure/controllers/user-locations/user-locations.controller';
import { UserLocationOrmRepository } from './infrastructure/persistence/repositories/user-location.orm-repository';
import { UserLocationRepository } from './domain/repositories/user-location.repository';
import { GetUserLocationsUseCase } from './application/use-cases/get-user-locations.use-case';
import { CreateUserLocationUseCase } from './application/use-cases/create-user-location.use-case';
import { DeleteUserLocationUseCase } from './application/use-cases/delete-user-location.use-case';
import { UsersModule } from '../users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserLocationOrmEntity } from './infrastructure/persistence/orm-entities/user-location.orm.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserLocationOrmEntity]),
    UsersModule
  ],
  controllers: [UserLocationsController],
  providers: [
    UserLocationOrmRepository,
    {
      provide: UserLocationRepository,
      useExisting: UserLocationOrmRepository,
    },
    GetUserLocationsUseCase,
    CreateUserLocationUseCase,
    DeleteUserLocationUseCase
  ],
  exports: [
    GetUserLocationsUseCase,
    CreateUserLocationUseCase,
    DeleteUserLocationUseCase
  ],

})
export class LocationsModule {}
