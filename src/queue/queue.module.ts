import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { QueueService } from './queue.service';
import { NotificationsProcessor } from './processors/notifications.processor';
import { QueueController } from './queue.controller';
import { AlertOrmEntity } from '../modules/alerts/infrastructure/persistence/orm-entities/alert.orm-entity';
import { UserLocationOrmEntity } from '../modules/locations/infrastructure/persistence/orm-entities/user-location.orm.entity';
import { NotificationOrmEntity } from '../modules/notifications/infrastructure/persistence/orm-entities/notification.orm-entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlertsModule } from '../modules/alerts/alerts.module';
import { LocationsModule } from '../modules/locations/locations.module';
import { NotificationsModule } from '../modules/notifications/notifications.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      AlertOrmEntity,
      UserLocationOrmEntity,
      NotificationOrmEntity,
    ]),
    AlertsModule,
    LocationsModule,
    NotificationsModule,
    BullModule.forRoot({
      connection: {
        host: process.env.REDIS_HOST || 'redis',
        port: Number(process.env.REDIS_PORT || 6379),
        password: process.env.REDIS_PASSWORD || undefined,
      },
    }),
    BullModule.registerQueue({
      name: 'notifications',
    }),
  ],
  providers: [QueueService, NotificationsProcessor],
  exports: [QueueService],
  controllers: [QueueController],
})
export class QueueModule {}
