export interface ITrackCreateStatus {
  success?: boolean;
  message?: string;
  status?: number;
}

export interface IRecieveTrack {
  audio: Express.Multer.File;
  img?: Express.Multer.File;
}

export interface IUploadStatus {
  audioHlsUrl?: string;
  imgUrl?: string;
  success?: boolean;
}

export interface IResultCloudinary {
  cloudinaryImg?: string;
  cloudinaryAudio?: string;
}

export interface TrackRecieveParam {
  id: string;
  audioUrl: string;
}
export interface Todo {
  id?: number;
}
