import React from 'react';
import classNames from 'classnames';
import s from './Button.scss';
import { IButton, IButtonSize, IStyleColor } from './Button.interface';

const Button: React.FC<IButton> = ({
  type = 'button',
  size = 'l',
  color = 'pink',
  children,
  disabled,
  onClick,
  className
}) => {
  const buttonSize: IButtonSize = {
    s: s.small,
    m: s.medium,
    l: s.large
  };
  const styleColor: IStyleColor = {
    pink: s.pink,
    white: s.white
  };
  const classes = classNames(buttonSize[size], styleColor[color], className, {
    [s.disabled]: disabled
  });
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    onClick?.();
  };

  return (
    <div className={s.button}>
      <button
        onClick={handleClick}
        disabled={disabled}
        className={classes}
        type={type}
      >
        {children}
      </button>
    </div>
  );
};

export default Button;
