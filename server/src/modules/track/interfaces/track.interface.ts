import { UploadFileByLinkDTO } from '../dto/trackCreate.dto';

export type ITrackCreateStatus = {
  success?: boolean;
  message?: string;
  status?: number;
};

export type IRecieveTrack = {
  audio: Express.Multer.File;
  img?: Express.Multer.File;
};

export type IUploadStatus = {
  audioHlsUrl?: string;
  imgUrl?: string;
  success?: boolean;
};

export type IResultCloudinary = {
  cloudinaryImg?: string;
  cloudinaryAudio?: string;
};

export type ITrackCreate = {
  name?: string;
  artist?: string;
  userId: number;
} & IRecieveTrack;

export type IDownloadAudioProps = {
  urlSrc: string;
};

type IAudioURL = {
  attr: {
    title: string;
    class: string;
  };
  audio: boolean;
  audioCodec: string;
  contentLenght: number;
  downloadable: boolean;
  ext: string;
  filesize: number;
  isBundle: boolean;
  idDrm: boolean;
  isOtf: boolean;
  itag: string;
  name: string;
  no_audio: boolean;
  quality: string;
  qualityNumber: number;
  subname?: string;
  type: string;
  url: string;
};

export type IDownloadByLink = {
  id: string;
  url: IAudioURL[];
  thumb: string;
  meta: {
    duration: string;
    title: string;
    source: string;
    tags: string;
  };
  itags: string[];
  mp3Converter: string;
  sd?: string;
  hd?: boolean;
  video_quality?: string[];
  cipher: boolean;
  converter: any;
  diffConverter?: string;
  diffConverterHasDiff?: boolean;
  hosting: string;
};

export type IDownloadResult = {
  id: string;
  title: string;
  thumbnail?: string;
  duration: string;
  url: IAudioURL[];
};
