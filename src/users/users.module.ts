import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Rent } from 'src/entities/rent.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Rent])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
