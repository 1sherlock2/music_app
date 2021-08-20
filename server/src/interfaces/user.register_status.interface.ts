export interface IRegistrationStatus {
  success?: boolean;
  message?: string | object;
  status?: string | number;
}

export interface ILoginAccess {
  expiresIn: string;
  accessToken: string; 
}