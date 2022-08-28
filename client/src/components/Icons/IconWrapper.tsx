import React from 'react';
import { IAudioIconsProps } from './AudioPlayer/AudioPlayer.interface';
import { IIconWrapper } from './IconWrapper.interface';

const IconWrapper = ({
  color = '#333',
  size = '60px',
  children,
  ...rest
}: IAudioIconsProps) =>
  React.cloneElement<IIconWrapper>(children, {
    width: size,
    height: size,
    fill: color,
    ...rest
  });

export default IconWrapper;
