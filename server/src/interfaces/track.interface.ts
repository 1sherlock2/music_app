export interface ITrackCreateStatus {
  success?: boolean;
  message?: string;
  status?: number;
}

export interface IRecieveTrack {
  audio?: Express.Multer.File;
  img?: Express.Multer.File;
}
