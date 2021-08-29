import React from 'react';
import IconWrapper from './IconWrapper';
import { IVisibility } from './Visibility/Visibility.interface';

const Close = (props: any) => (
  <IconWrapper {...props}>
    <svg viewBox="0 0 24 24">
      <path d="m12 10.59 2.885-2.885a.997.997 0 0 1 1.41 1.41L13.41 12l2.885 2.885a.997.997 0 1 1-1.41 1.41L12 13.41l-2.885 2.885a.997.997 0 1 1-1.41-1.41L10.59 12 7.705 9.115a.997.997 0 0 1 1.41-1.41L12 10.59z" />
      <path
        fillRule="evenodd"
        d="M2.25 12A9.74 9.74 0 0 1 12 2.25 9.74 9.74 0 0 1 21.75 12 9.74 9.74 0 0 1 12 21.75 9.74 9.74 0 0 1 2.25 12zm1.5 0c0 4.548 3.702 8.25 8.25 8.25s8.25-3.702 8.25-8.25S16.548 3.75 12 3.75 3.75 7.452 3.75 12z"
        clipRule="evenodd"
      />
    </svg>
  </IconWrapper>
);

export default Close;
