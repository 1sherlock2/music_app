import React from 'react';
import IconWrapper from './IconWrapper';
import { IIconWrapperProps } from './IconWrapper.interface';

const ErrorIcon = (props: IIconWrapperProps) => (
  <IconWrapper {...props}>
    <svg viewBox="0 0 32 32">
      <g>
        <circle cx="16" cy="16" fill="none" r="15" stroke="#ff69b4" />
        <line fill="none" stroke="#ff69b4" x1="16" x2="16" y1="24" y2="26" />
        <line fill="none" stroke="#ff69b4" x1="16" x2="16" y1="22" y2="6" />
      </g>
    </svg>
  </IconWrapper>
);

export default ErrorIcon;
