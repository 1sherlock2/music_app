import { IsArray, IsEmail, IsNotEmpty, IsString } from "class-validator";
import { Role } from "src/enums/role.enum";

export class UserCreateDTO {  
  @IsNotEmpty()  nickname: string;
  @IsNotEmpty()  password: string;
  @IsNotEmpty() @IsEmail()  email: string;
  @IsString({ each: true })  roles: string[];
}