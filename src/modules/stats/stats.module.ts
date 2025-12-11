import { Module } from '@nestjs/common';
import { StatsController } from './stats.controller';
import { StatsService } from './stats.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserOrmEntity } from '../users/infrastructure/persistence/orm-entities/user.orm-entity';
import { AlertOrmEntity } from '../alerts/infrastructure/persistence/orm-entities/alert.orm-entity';
import { AlertStateOrmEntity } from '../alerts/infrastructure/persistence/orm-entities/alert-state.orm-entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserOrmEntity, AlertOrmEntity, AlertStateOrmEntity])
  ],
  controllers: [StatsController],
  providers: [StatsService]
})
export class StatsModule { }
