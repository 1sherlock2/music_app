import { SetStateAction } from 'react';

export interface IInput {
  placeholder?: string;
  type?: string;
  closeSize?: boolean;
  onChange?: React.Dispatch<React.SetStateAction<HTMLInputElement>>;
  value: string;
  size?: string;
  style?: string;
  disabled?: boolean | undefined;
  validate?: string;
}

export interface IErrorStatus {
  status?: boolean;
  message?: string;
}

export type IErrorInput = IErrorStatus | boolean;

export interface IValidationIptions {
  email: RegExp;
  password: {
    length: number;
  };
}

export interface ITypeInput {
  text?: string;
  password?: string;
}

export interface IInputStyle {
  [x: string]: string;
}
export interface IValidationInput {
  value: string;
  type?: string;
}
