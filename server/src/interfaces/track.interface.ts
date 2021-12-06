export interface ITrackCreateStatus {
  success?: boolean;
  message?: string;
  status?: number;
}

export interface IRecieveTrack {
  audio?: Express.Multer.File;
  img?: Express.Multer.File;
}

type Eager = {
  batch_id: string,
  secure_url: string,
  status: string,
  url: string,
}
export interface IUploadStatus {
  urlImg?: string;
  urlAudio?: string;
  success?: boolean;
  message?: string;
  eager?: Eager[]
}

export interface IResultCloudinary {
  cloudinaryImg?: string;
  cloudinaryAudio?: string;
  full_hd_audio?: string;
  hd_audio?: string;
}

export interface TrackRecieveParam {
  id: string;
  audioUrl: string;
}
