import React from 'react';
import classNames from 'classnames';
import s from './Button.scss';

const Button = ({ size }) => {
  const buttonSize = {
    s: s.small,
    m: s.medium,
    l: s.large,
  };

  return <button className={classNames(buttonSize[size], s.button)}> </button>;
};

export default Button;
