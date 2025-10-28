import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { InMemoryUsersRepository } from './repositories/in-memory-users.repository';
import { AccountsModule } from '../accounts/accounts.module';

@Module({
  imports: [AccountsModule],
  controllers: [UsersController],
  providers: [UsersService, InMemoryUsersRepository],
  exports: [UsersService],
})
export class UsersModule {}
