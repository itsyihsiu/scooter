import { IsNotEmpty, IsEnum } from 'class-validator';

export class CreateRentDto {
  @IsNotEmpty()
  user: number;

  @IsNotEmpty()
  scooter: number;
}
