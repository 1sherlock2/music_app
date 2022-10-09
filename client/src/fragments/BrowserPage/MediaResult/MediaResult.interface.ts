export type IDownloadByLink = {
  id: string;
  duration: string;
  title: string;
  url: IAudioURL[];
  thumbnail: string;
};

export type IAudioURL = {
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
