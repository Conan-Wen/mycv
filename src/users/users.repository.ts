import { DataSource } from 'typeorm';
import { dbConstants } from '../constants/dbConstants';
import { User } from './user.entity';

export const usersRepository = {
  provide: dbConstants.USER_REPOSITORY,
  inject: [dbConstants.MARIADB],
  useFactory: (datasource: DataSource) => datasource.getRepository(User),
};
