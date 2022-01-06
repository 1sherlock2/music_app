import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class IUserId {
  @IsString()
  userId: string;
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
