import { Type } from 'class-transformer';
import {
  IsArray,
  IsDefined,
  isInstance,
  IsNotEmpty,
  IsString,
  ValidateNested
} from 'class-validator';

class IUserId {
  id: number;
}
export class UserId {
  @IsDefined()
  @ValidateNested()
  @Type(() => IUserId)
  user: IUserId;
}
export class TrackCreateDTO {
  @IsNotEmpty() @IsString() name: string;

  @IsString()
  artist?: string;
}
export class UpdateOrderTracks {
  @IsArray()
  order?: number[];
  userId: string;
}
