import React from 'react';
import IconWrapper from './IconWrapper';

const TripleLineIcon = (props) => (
  <IconWrapper {...props}>
    <svg viewBox="0 0 24 24" fill="none">
      <path
        d="M5 6H12H19M5 12H19M5 18H19"
        stroke="#000000"
        stroke-width="2"
        stroke-linecap="round"
      />
    </svg>
  </IconWrapper>
);

export default TripleLineIcon;
