import { Transform } from 'class-transformer';
import {
  IsString,
  IsPhoneNumber,
  Length,
  IsMobilePhone,
} from 'class-validator';

export class RegisterUserDto {
  @IsString()
  username: string;
  @IsString()
  @Length(6)
  password: string;
  @IsString()
  @IsPhoneNumber('RU')
  telephoneNumber: string;
}
