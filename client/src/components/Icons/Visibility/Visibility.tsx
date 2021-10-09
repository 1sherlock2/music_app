import React from 'react';
import IconWrapper from '../IconWrapper';
import { IIconWrapper } from '../IconWrapper.interface';

const Visibility = (props: IIconWrapper & JSX.IntrinsicAttributes) => (
  <IconWrapper {...props}>
    <svg viewBox="0 0 24 24">
      <path
        fillOpacity=".87"
        fillRule="evenodd"
        d="M7.75 11.95a4.26 4.26 0 118.51.01 4.26 4.26 0 01-8.51-.01zm7 0a2.75 2.75 0 10-5.5 0 2.75 2.75 0 005.5 0z"
        clipRule="evenodd"
      />
      <path
        fillOpacity=".87"
        fillRule="evenodd"
        d="M1.54 11.33a11.57 11.57 0 0120.92 0c.18.4.18.85 0 1.24a11.57 11.57 0 01-20.92 0 1.44 1.44 0 010-1.24zm19.4.29A10.02 10.02 0 0012 6.2c-3.8 0-7.2 2.09-8.93 5.42-.11.2-.11.45 0 .66A10.02 10.02 0 0012 17.7c3.8 0 7.2-2.09 8.93-5.42.11-.2.11-.45 0-.66z"
        clipRule="evenodd"
      />
    </svg>
  </IconWrapper>
);

export default Visibility;
