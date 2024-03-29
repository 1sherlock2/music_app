import React from 'react';
import IconWrapper from '../IconWrapper';
import { IIconWrapperProps } from '../IconWrapper.interface';

const BrowserIcon = (props: IIconWrapperProps) => (
  <IconWrapper {...props}>
    <svg viewBox="0 0 512 512">
      <g>
        <g>
          <path d="M11,11v490h490V11H11z M478.1,478.1H33.9V127.8h444.1V478.1z M33.9,105.9V33.9h444.1v71.9H33.9z" />
          <rect width="22.9" x="410.3" y="57.9" height="22.9" />
          <rect width="22.9" x="353" y="57.9" height="22.9" />
          <rect width="22.9" x="295.6" y="57.9" height="22.9" />
          <rect width="171" x="86.1" y="193.4" height="22.9" />
          <rect width="171" x="86.1" y="259.1" height="22.9" />
          <rect width="339.9" x="86.1" y="324.8" height="22.9" />
          <rect width="339.9" x="86.1" y="390.5" height="22.9" />
        </g>
      </g>
    </svg>
  </IconWrapper>
);

export default BrowserIcon;
