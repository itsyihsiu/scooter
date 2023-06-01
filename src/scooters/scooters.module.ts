import { Module } from '@nestjs/common';
import { ScootersController } from './scooters.controller';
import { ScootersService } from './scooters.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Scooter } from 'src/entities/scooter.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Scooter])],
  controllers: [ScootersController],
  providers: [
    {
      provide: 'SCOOTERS_SERVICE',
      useClass: ScootersService,
    },
  ],
})
export class ScooterModule {}
