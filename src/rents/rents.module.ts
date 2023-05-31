import { Module } from '@nestjs/common';
import { RentsController } from './rents.controller';
import { RentsService } from './rents.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rent } from 'src/entities/rent.entity';
import { User } from 'src/entities/user.entity';
import { Scooter } from 'src/entities/scooter.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Scooter, Rent])],
  controllers: [RentsController],
  providers: [RentsService],
})
export class RentsModule {}
