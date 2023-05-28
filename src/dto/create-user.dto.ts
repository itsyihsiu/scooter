import { IsNotEmpty, MaxLength } from 'class-validator';
import { PASSWORD_LENGTH, USERNAME_LENGTH } from 'src/utils/constants';

export class CreateUserDto {
  @IsNotEmpty()
  @MaxLength(USERNAME_LENGTH)
  username: string;

  @IsNotEmpty()
  @MaxLength(PASSWORD_LENGTH)
  password: string;
}
