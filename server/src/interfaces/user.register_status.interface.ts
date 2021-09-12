export interface IRegistrationStatus {
  success?: boolean;
  message?: string | object;
  status?: string | number;
}

export interface ILoginAccess {
  nickname?: string;
  accessToken?: string;
  success: boolean;
}
