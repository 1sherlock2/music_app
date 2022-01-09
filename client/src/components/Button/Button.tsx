import React, { useCallback } from 'react';
import classNames from 'classnames';
import s from './Button.scss';
import { IButton, IButtonSize, IStyleColor } from './Button.interface';

const Button: React.FC<IButton> = ({
  type = 'button',
  size = 'l',
  color = 'pink',
  children,
  disabled,
  onClick
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
  const classes = classNames(buttonSize[size], styleColor[color], {
    [s.disabled]: disabled
  });
  const handleClick = (event: any) => {
    event.preventDefault();
    onClick();
  };

  return (
    <div className={s.button}>
      <button onClick={handleClick} disabled={disabled} className={classes}>
        {children}
      </button>
    </div>
  );
};

export default Button;
