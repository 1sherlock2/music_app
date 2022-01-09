export interface ILoginDTO {
  nickname: string;
  password: string;
}

export interface ILoginDataDB {
  data: {
    success: boolean;
    accessToken?: string;
    nickname?: string;
  };
}
export interface IRegisterDTO {
  nickname: string;
  email: string;
  password: string;
}

export interface IRegisterData {
  data: {
    success: boolean;
    status: number;
    message: string;
  };
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
