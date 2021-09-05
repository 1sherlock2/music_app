import { IErrorStatus } from './Input.interface';

export const validateOptions = {
  email: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
  password: {
    length: 5
  }
};

export const errorStatus = (
  status: boolean,
  message: string
): IErrorStatus => ({ status, message });
