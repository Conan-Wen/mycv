import { Provider } from '@nestjs/common';
import { dbConstants } from '../constants/dbConstants';
import { mariadbDataSource } from '../data-sources/mariadbDataSource';

export const mariadbProvider: Provider = {
  provide: dbConstants.MARIADB,
  useFactory: async () => await mariadbDataSource.initialize(),
};
