import { DataSource } from 'typeorm';
import { dbConstants } from '../constants/dbConstants';
import { Report } from './report.entity';

export const reportsRepository = {
  provide: dbConstants.REPORT_REPOSITORY,
  inject: [dbConstants.MARIADB],
  useFactory: (datasource: DataSource) => datasource.getRepository(Report),
};
