import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';
import httpMessages from 'src/utils/httpMessages';

export class UserCreateDTO {
  @IsNotEmpty() @IsString() nickname: string;

  @IsNotEmpty() @IsString() @Length(5, 15) password: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail({}, { message: httpMessages.emailNotCorrect })
  email: string;

  @IsString({ each: true }) roles: string[];
}
