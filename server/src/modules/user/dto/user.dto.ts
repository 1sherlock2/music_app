import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length
} from 'class-validator';
import { RoleType } from '../../../enums/role.enum';
import httpMessages from '../../../utils/httpMessages';

export class UserCreateDTO {
  @IsNotEmpty() @IsString() nickname: string;

  @IsNotEmpty() @IsString() @Length(5, 15) password: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail({}, { message: httpMessages.emailNotCorrect })
  email: string;

  @IsOptional()
  @IsString({ each: true })
  roles?: string[];
}

export class LoginDTO {
  @IsNotEmpty()
  @IsString()
  nickname: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}

export class AddRoleDTO {
  @IsNotEmpty()
  @IsString()
  userId: string | number;

  @IsNotEmpty()
  @IsString({ each: true, groups: RoleType })
  role: string | typeof RoleType;
}

export class ChangePassDTO extends LoginDTO {
  @IsNotEmpty()
  @IsString()
  old_pass: string;
}
