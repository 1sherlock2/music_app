import { SetStateAction } from 'react';

export type IInput = {
  placeholder?: string;
  type?: string;
  closeSize?: boolean;
  onChange?: (value: string) => void;
  value: string;
  size?: 's' | 'm' | 'l';
  style?: 'white' | 'pink';
  disabled?: boolean | undefined;
  validate?: string;
  className?: string;
};

export type IErrorStatus = {
  status?: boolean;
  message?: string;
};

export type IErrorInput = IErrorStatus | boolean;

export type IValidationIptions = {
  email: RegExp;
  password: {
    length: number;
  };
};

export type ITypeInput = {
  text?: string;
  password?: string;
};

export type IInputStyle = {
  white: string;
  pink: string;
};

export type IIconSize = {
  s: string;
  m: string;
  l: string;
};

export type IValidationInput = {
  value: string;
  type?: string;
};
