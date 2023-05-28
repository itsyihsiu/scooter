import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateScooterDto {
  @IsNotEmpty()
  @IsString()
  dateOfManufacture: string;
}
