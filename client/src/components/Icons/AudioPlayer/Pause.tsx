import React from 'react';
import IconWrapper from '../IconWrapper';
import { IIconWrapperProps } from '../IconWrapper.interface';

const Pause = (props: IIconWrapperProps) => (
  <IconWrapper {...props}>
    <svg viewBox="0 0 64 64">
      <path
        d="M32,5c14.888,0,27,12.112,27,27S46.888,59,32,59S5,46.888,5,32S17.112,5,32,5 M32,2C15.433,2,2,15.432,2,32
	c0,16.568,13.433,30,30,30s30-13.432,30-30C62,15.432,48.567,2,32,2L32,2z"
      />
      <g>
        <path
          d="M39,17.563c-2.75,0-5,2.25-5,5v18.875c0,2.75,2.25,5,5,5s5-2.25,5-5V22.563C44,19.813,41.75,17.563,39,17.563z M41,41.438
		c0,1.1-0.9,2-2,2s-2-0.9-2-2V22.563c0-1.1,0.9-2,2-2s2,0.9,2,2V41.438z"
        />
        <path
          d="M25,17.563c-2.75,0-5,2.25-5,5v18.875c0,2.75,2.25,5,5,5s5-2.25,5-5V22.563C30,19.813,27.75,17.563,25,17.563z M27,41.438
		c0,1.1-0.9,2-2,2s-2-0.9-2-2V22.563c0-1.1,0.9-2,2-2s2,0.9,2,2V41.438z"
        />
      </g>
    </svg>
  </IconWrapper>
);

export default Pause;
