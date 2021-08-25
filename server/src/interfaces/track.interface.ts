export interface ITrackCreateStatus {
  success?: boolean;
  message?: string;
  status?: number;
}

export interface IRecieveTrack {
  audio?: Express.Multer.File;
  img?: Express.Multer.File;
}

export interface IUploadObjectReduce {
  img?: string;
  audio?: string;
  status?: number;
  message?: string;
}
