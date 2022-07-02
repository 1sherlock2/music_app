import { Type } from 'class-transformer';
import {
  IsArray,
  IsDefined,
  isInstance,
  IsNotEmpty,
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
