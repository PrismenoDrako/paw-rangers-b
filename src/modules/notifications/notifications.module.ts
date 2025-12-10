import { Get, Module } from '@nestjs/common';
import { NotificationRepository } from './domain/repositories/notification.repository';
import { NotificationOrmRepository } from './infrastructure/persistence/repositories/notification.orm-repository';
import { CreateNotificationUseCase } from './application/use-cases/create-notification.use-case';
import { MarkNotificationAsReadUseCase } from './application/use-cases/mark-notification-as-read.use-case';
import { GetNotificationsByUserUseCase } from './application/use-cases/get-notifications-by-user.use-case';
import { DeleteNotificationUseCase } from './application/use-cases/delete-notification.use-case';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotificationOrmEntity } from './infrastructure/persistence/orm-entities/notification.orm-entity';
import { UsersModule } from '../users/users.module';
import { NotificationsGateway } from './infrastructure/gateways/notifications.gateway';
import { JwtModule } from '@nestjs/jwt';
import { NotificationsController } from './infrastructure/controllers/notifications/notifications.controller';
import { NotificationsService } from './infrastructure/services/notifications/notifications.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([NotificationOrmEntity]),
        UsersModule,
        JwtModule.register({
            secret: process.env.JWT_SECRET,
            signOptions: { expiresIn: '1h' },
        }),
    ],
    controllers: [NotificationsController],
    providers: [
        NotificationOrmRepository,
        {
            provide: NotificationRepository,
            useExisting: NotificationOrmRepository,
        },
        CreateNotificationUseCase,
        GetNotificationsByUserUseCase,
        MarkNotificationAsReadUseCase,
        DeleteNotificationUseCase,
        NotificationsGateway,
        NotificationsService
    ],
    exports: [
        CreateNotificationUseCase,
        GetNotificationsByUserUseCase,
        MarkNotificationAsReadUseCase,
        DeleteNotificationUseCase,
        NotificationsGateway
    ],
})
export class NotificationsModule { }
