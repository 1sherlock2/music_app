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
  urlImg?: string;
  urlAudio?: string;
  status?: number;
  message?: string;
  success: boolean;
}

export interface IUploadStatus {
  urlImg?: string;
  urlAudio?: string;
  success?: boolean;
  message?: string;
}

export interface IResultCloudinary {
  cloudinaryImg?: string;
  cloudinaryAudio?: string;
}
