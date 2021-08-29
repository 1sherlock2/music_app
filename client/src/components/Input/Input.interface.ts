import { SetStateAction } from 'react';

export interface IInput {
  placeholder?: string;
  type?: string;
  closeSize?: boolean;
  onChange?: React.Dispatch<React.SetStateAction<HTMLInputElement>>;
  value: string | number | readonly string[] | undefined;
  size?: string;
  style?: string;
}

// export interface IIconSize {
//   s?: string;
//   m?: string;
//   l?: string;
// }

export interface ITypeInput {
  text?: string;
  password?: string;
}

export interface IInputStyle {
  [x: string]: string;
}
