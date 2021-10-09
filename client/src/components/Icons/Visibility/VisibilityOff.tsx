import React from 'react';
import IconWrapper from '../IconWrapper';
import { IIconWrapper } from '../IconWrapper.interface';

const VisibilityOff = (props: JSX.IntrinsicAttributes & IIconWrapper) => (
  <IconWrapper {...props}>
    <svg viewBox="0 0 24 24">
      <path
        fillOpacity=".87"
        fillRule="evenodd"
        d="M2.7 3.61a1 1 0 000 1.42l2.16 2.15a11.64 11.64 0 00-3.32 4.16c-.19.39-.19.84 0 1.23a11.57 11.57 0 0014.59 5.88l2.9 2.9a1 1 0 101.42-1.41L4.12 3.6a1 1 0 00-1.41 0zm12.25 13.66l-1.37-1.37a4.26 4.26 0 01-5.53-5.53L5.93 8.25a10.07 10.07 0 00-2.85 3.38c-.11.21-.11.46 0 .67a10.02 10.02 0 0011.88 4.98zM9.27 11.6l-.02.37a2.75 2.75 0 003.11 2.72L9.27 11.6z"
        clipRule="evenodd"
      />
      <path
        fillOpacity=".87"
        d="M20.93 12.3c-.6 1.14-1.4 2.15-2.34 2.97l1.05 1.05a11.64 11.64 0 002.82-3.75c.19-.39.19-.84 0-1.23a11.57 11.57 0 00-13.9-6.11l1.21 1.22a10.02 10.02 0 0111.16 5.17c.11.21.11.46 0 .67z"
      />
      <path
        fillOpacity=".87"
        d="M12.6 9.27L11.11 7.8a4.25 4.25 0 015.04 5.04l-1.47-1.47a2.76 2.76 0 00-2.1-2.1z"
      />
    </svg>
  </IconWrapper>
);

export default VisibilityOff;
