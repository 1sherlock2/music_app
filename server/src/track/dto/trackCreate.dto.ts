import { IsNotEmpty } from 'class-validator';

type UserId = string | number;
export class TrackCreateDTO {
  @IsNotEmpty() name: string;
  artist?: string;
  img?: Express.Multer.File;
  userId: UserId;
  @IsNotEmpty() audio: Express.Multer.File;
}
export class UpdateOrderTracks {
  order?: number[];
  userId: UserId;
}
