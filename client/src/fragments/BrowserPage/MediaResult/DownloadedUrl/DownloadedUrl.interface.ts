export type IDownloadedUrl = {
  ext: string;
  id: string;
  audioCodec: string;
  quality: string;
  audioUrl: string;
  thumbnail: string;
  artist: string;
  name: string;
};

export type IDataByQuery = Pick<IDownloadedUrl, 'name' | 'artist' | 'ext'> & {
  image: string;
  url: string;
};
