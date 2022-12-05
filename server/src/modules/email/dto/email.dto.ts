import { IsNotEmpty, IsString } from 'class-validator';

export class ConfirmDTO {
  @IsNotEmpty()
  @IsString()
  token: string;
}
