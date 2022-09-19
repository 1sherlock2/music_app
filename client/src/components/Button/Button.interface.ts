export interface IButton {
  type: 'button' | 'submit' | 'reset';
  size?: 'l' | 'm' | 's';
  color?: 'pink' | 'white';
  children?: any;
  disabled?: boolean;
  onClick: () => void;
  className: string;
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
