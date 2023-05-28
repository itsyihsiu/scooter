import { IsNotEmpty, IsString } from 'class-validator';

export class CreateScooterDto {
  @IsNotEmpty()
  @IsString()
  // MMMM.DD same as the license eg. 出廠日期 1999.01
  dateOfManufacture: string;
}
