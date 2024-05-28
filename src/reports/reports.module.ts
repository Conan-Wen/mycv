import { Module } from '@nestjs/common';
import { DatabaseMoudle } from '../db/database.module';
import { ReportsController } from './reports.controller';
import { reportsRepository } from './reports.providers';
import { ReportsService } from './reports.service';

@Module({
  imports: [DatabaseMoudle],
  controllers: [ReportsController],
  providers: [ReportsService, reportsRepository],
})
export class ReportsModule {}
