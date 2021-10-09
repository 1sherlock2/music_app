import React from 'react';
import { IIconWrapper } from './IconWrapper.interface';

const IconWrapper = ({
  color = 'currentColor',
  size = '1rem',
  children,
  ...rest
}: IIconWrapper) =>
  React.cloneElement(children, {
    width: size,
    height: size,
    fill: color,
    ...rest
  });

export default IconWrapper;
