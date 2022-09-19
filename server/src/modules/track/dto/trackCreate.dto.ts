import { Type } from 'class-transformer';
import {
  IsArray,
  IsDefined,
  isInstance,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested
} from 'class-validator';

export class IUserId {
  userId: number;
}
export class IUser {
  @IsDefined()
  @ValidateNested()
  @Type(() => IUserId)
  user: IUserId;
}
export class TrackCreateDTO {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsString()
  artist?: string;
}
export class UpdateOrderTracks {
  @IsArray()
  order?: number[];
  userId: IUserId;
}

export class UploadFileByLinkDTO {
  @IsString()
  @IsNotEmpty()
  url: string;

  @IsString()
  @IsOptional()
  image?: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  ext: string;

  @IsString()
  @IsOptional()
  artist?: string;

  @IsString()
  @IsOptional()
  name?: string;
}
