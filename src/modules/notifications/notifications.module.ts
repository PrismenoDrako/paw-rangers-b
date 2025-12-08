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

@Module({
    imports: [
        TypeOrmModule.forFeature([NotificationOrmEntity]),
        UsersModule
    ],
    controllers: [],
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
    ],
    exports: [
        CreateNotificationUseCase,
        GetNotificationsByUserUseCase,
        MarkNotificationAsReadUseCase,
        DeleteNotificationUseCase,
    ],
})
export class NotificationsModule {}
