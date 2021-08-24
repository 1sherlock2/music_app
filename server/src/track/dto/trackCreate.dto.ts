import { IsNotEmpty } from 'class-validator';

export class TrackCreateDTO {
  @IsNotEmpty() name: string;
  artist?: string;
  img?: Express.Multer.File;
  @IsNotEmpty() audio: Express.Multer.File;
}
