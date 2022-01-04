import { IsArray, IsNotEmpty, IsString } from 'class-validator';

type UserId = string;
export class TrackCreateDTO {
  @IsNotEmpty() @IsString() name: string;

  @IsString()
  artist?: string;

  img?: Express.Multer.File;

  @IsString()
  userId: UserId;

  @IsNotEmpty() audio: Express.Multer.File;
}
export class UpdateOrderTracks {
  @IsArray()
  order?: number[];

  @IsString()
  userId: UserId;
}
