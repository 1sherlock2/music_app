export interface IResponseAuth {
  success: boolean;
  message: string;
}

export interface ILoginDTO {
  data: {
    success: boolean;
    accessToken?: string;
    nickname?: string;
  };
}
