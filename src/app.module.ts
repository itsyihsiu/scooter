import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { ScooterModule } from './scooters/scooters.module';
import { RentsModule } from './rents/rents.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'scooter',
      password: 'scooter_23',
      database: 'scooter',
      // entities: [],
      autoLoadEntities: true,
      synchronize: true,
    }),
    UsersModule,
    ScooterModule,
    RentsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
