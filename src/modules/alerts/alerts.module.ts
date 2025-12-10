import { Module } from '@nestjs/common';
import { AlertsController } from './infrastructure/controllers/alerts/alerts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlertOrmEntity } from './infrastructure/persistence/orm-entities/alert.orm-entity';
import { AlertImageOrmEntity } from './infrastructure/persistence/orm-entities/alert-image.orm-entity';
import { AlertService } from './infrastructure/services/alerts.service';
import { StorageService } from '../storage/storage.service';
import { AlertRepository } from './domain/repositories/alert.repository';
import { AlertOrmRepository } from './infrastructure/persistence/repositories/alert.orm-repository';
import { AlertStateOrmEntity } from './infrastructure/persistence/orm-entities/alert-state.orm-entity';
import { UserLocationOrmEntity } from '../locations/infrastructure/persistence/orm-entities/user-location.orm.entity';
import { BullModule } from '@nestjs/bullmq';

@Module({
  imports: [
    TypeOrmModule.forFeature([AlertOrmEntity, AlertImageOrmEntity, AlertStateOrmEntity, UserLocationOrmEntity]), // ORM entities
    BullModule.registerQueue({
      name: 'notifications',
    }),
  ],
  controllers: [AlertsController],
  providers: [
    AlertService,
    StorageService,
    {
      provide: AlertRepository, // abstractions
      useClass: AlertOrmRepository, // concrete implementation
    },
  ],
  exports: [AlertService],
})
export class AlertsModule {}