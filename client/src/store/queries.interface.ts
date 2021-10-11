export interface ILoginDataDB {
  nickname: string;
  password: string;
}

export interface ICheckLoginQuery {
  data: {
    userId: number;
    success: boolean;
  };
}
export interface IGetTrackInfoSrc {
  audioSrc: string;
  imgSrc?: string;
}
