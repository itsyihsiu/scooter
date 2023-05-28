import { IsNotEmpty, MaxLength, ValidateIf } from 'class-validator';
import { PASSWORD_LENGTH, USERNAME_LENGTH } from 'src/utils/constants';

export class UpdateUserDto {
  @ValidateIf((o) => !o.password || o.username)
  @MaxLength(USERNAME_LENGTH)
  username: string;

  @ValidateIf((o) => !o.username || o.password)
  @MaxLength(PASSWORD_LENGTH)
  password: string;
}
