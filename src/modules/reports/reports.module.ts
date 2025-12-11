import { Module } from '@nestjs/common';
import { ReportsController } from './infrastructure/controllers/reports/reports.controller';
import { ReportsService } from './infrastructure/services/reports/reports.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlertReportOrmEntity } from './infrastructure/persistence/orm-entities/report.orm-entitiy';
import { AlertReportImageOrmEntity } from './infrastructure/persistence/orm-entities/report-image.orm-entity';
import { StorageService } from '../storage/storage.service';
import { BullModule } from '@nestjs/bullmq';

@Module({
  imports: [TypeOrmModule.forFeature([AlertReportOrmEntity, AlertReportImageOrmEntity]),
  BullModule.registerQueue({
    name: 'notifications', 
  }),
  ],
  controllers: [ReportsController],
  providers: [ReportsService, StorageService]
})
export class ReportsModule { }
