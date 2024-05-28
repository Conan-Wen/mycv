// npm run typeorm:dev migration:generate ./src/migrations/Initialization -- -d ./src/data-sources/mariadbDataSource.ts

// npm run typeorm:dev migration:run -- -d ./src/data-sources/mariadbDataSource.ts

import { DataSource } from 'typeorm';
import { Initialization1715226488935 } from '../migrations/1715226488935-Initialization';
import { Report } from '../reports/report.entity';
import { User } from '../users/user.entity';

export const mariadbDataSource = new DataSource({
  type: 'mariadb',
  entities: [User, Report],
  host: process.env.MARIA_DB_HOST,
  port: Number(process.env.MARIA_DB_PORT),
  username: process.env.MARIA_DB_USERNAME,
  password: process.env.MARIA_DB_PASSWORD,
  database: process.env.MARIA_DB_DATABASE,
  synchronize: false,
  logging: ['error'],
  migrations: [Initialization1715226488935],
  migrationsRun: true,
});
