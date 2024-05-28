import { Module } from '@nestjs/common';
import { mariadbProvider } from './mariaDatabase.providers';

@Module({
  providers: [mariadbProvider],
  exports: [mariadbProvider],
})
export class DatabaseMoudle {}
