export interface ILoginDTO {
  nickname: string;
  password: string;
}

export interface ILoginDataDB extends IErrorResponseData {
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

export interface IRegisterData extends IErrorResponseData {
  success: boolean;
}

interface IErrorResponseData {
  statusCode?: number;
  message?: string;
  error?: string;
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
