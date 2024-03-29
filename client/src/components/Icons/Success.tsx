import React from 'react';
import IconWrapper from './IconWrapper';
import { IIconWrapperProps } from './IconWrapper.interface';

const SuccessIcon = (props: IIconWrapperProps) => (
  <IconWrapper {...props}>
    <svg viewBox="0 0 36 36">
      <path d="M13.72,27.69,3.29,17.27a1,1,0,0,1,1.41-1.41l9,9L31.29,7.29a1,1,0,0,1,1.41,1.41Z"></path>
      <rect x="0" y="0" width="36" height="36" fillOpacity="0" />
    </svg>
  </IconWrapper>
);

export default SuccessIcon;

// <svg viewBox="0 0 36 36" version="1.1">
//   <path d="M13.72,27.69,3.29,17.27a1,1,0,0,1,1.41-1.41l9,9L31.29,7.29a1,1,0,0,1,1.41,1.41Z"></path>
//   <rect x="0" y="0" width="36" height="36" />
// </svg>
