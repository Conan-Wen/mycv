import { Module } from '@nestjs/common';
import { DatabaseMoudle } from '../db/database.module';
import { UsersController } from './users.controller';
import { usersRepository } from './users.repository';
import { UsersService } from './users.service';

@Module({
  imports: [DatabaseMoudle],
  providers: [UsersService, usersRepository],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
