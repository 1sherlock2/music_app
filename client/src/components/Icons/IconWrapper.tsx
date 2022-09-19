import React from 'react';
import { IIconWrapper, IIconWrapperProps } from './IconWrapper.interface';

const IconWrapper = ({
  color = '#333',
  size = '60px',
  children,
  ...rest
}: IIconWrapperProps) =>
  React.cloneElement<IIconWrapper>(children, {
    width: size,
    height: size,
    fill: color,
    ...rest
  });

export default IconWrapper;
