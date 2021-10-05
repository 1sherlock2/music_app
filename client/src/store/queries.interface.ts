export interface ILoginDataDB {
  nickname: string;
  password: string;
}

export interface ICheckLoginQuery {
  data: {
    userId: number;
  }
}