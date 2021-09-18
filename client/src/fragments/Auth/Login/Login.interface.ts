export interface IResponseAuth {
  success: boolean;
  message: string;
}

export interface ILoginDTO {
  data: {
    success: boolean;
    token?: string;
    nickname?: string;
  };
}
