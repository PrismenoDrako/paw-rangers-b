import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './modules/users/users.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './modules/auth/auth.module';
import { PetsModule } from './modules/pets/pets.module';
import { StorageModule } from './modules/storage/storage.module';
import { LocationsModule } from './modules/locations/locations.module';
import { NotificationsModule } from './modules/notifications/notifications.module';
import { AlertsModule } from './modules/alerts/alerts.module';
import { QueueModule } from './queue/queue.module';
import { StatsModule } from './modules/stats/stats.module';
import { ReportsModule } from './modules/reports/reports.module';




@Module({
  imports: [
    ConfigModule.forRoot({
			isGlobal: true,
			envFilePath: '.env',
		}),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT || '5432', 10),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      autoLoadEntities: true,
      synchronize: true, // solo en desarrollo
    }),
    UsersModule,
    DatabaseModule,
    AuthModule,
    PetsModule,
    StorageModule,
    LocationsModule,
    NotificationsModule,
    AlertsModule,
    QueueModule,
    StatsModule,
    ReportsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
