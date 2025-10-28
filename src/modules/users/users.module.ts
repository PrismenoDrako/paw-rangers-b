import { Module } from '@nestjs/common';
import { UsersController } from './infrastructure/controllers/users/users.controller';


@Module({

  controllers: [UsersController]
})
export class UsersModule {}
