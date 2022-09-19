import React from 'react';
import IconWrapper from '../IconWrapper';
import { IIconWrapperProps } from '../IconWrapper.interface';

const DefaultTrackImg = (props: IIconWrapperProps) => (
  <IconWrapper {...props}>
    <svg viewBox="0 0 24 24">
      <g
        fill="none"
        fill-rule="evenodd"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="m6.5 8.5v4" />
        <path d="m8.5 6.5v9" />
        <path d="m10.5 9.5v2" />
        <path d="m12.5 7.5v6.814" />
        <path d="m14.5 4.5v12" />
      </g>
    </svg>
  </IconWrapper>
);

export default DefaultTrackImg;
