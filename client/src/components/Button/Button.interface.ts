export interface IButton {
  type?: string;
  size?: 'l' | 'm' | 's';
  color?: 'pink' | 'white';
  children?: any;
  disabled?: boolean;
  onClick: () => void;
}

export interface IButtonSize {
  s: string;
  m: string;
  l: string;
}

export interface IStyleColor {
  pink: string;
  white: string;
}
