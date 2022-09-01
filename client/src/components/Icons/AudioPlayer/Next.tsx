import React from 'react';
import IconWrapper from '../IconWrapper';
import { IAudioIconsProps } from './AudioPlayer.interface';

const Next = (props: IAudioIconsProps) => (
  <IconWrapper {...props}>
    <svg viewBox="0 0 64 64">
      <path
        d="M32,5c14.888,0,27,12.112,27,27S46.888,59,32,59S5,46.888,5,32S17.112,5,32,5 M32,2C15.433,2,2,15.432,2,32
	c0,16.568,13.433,30,30,30s30-13.432,30-30C62,15.432,48.567,2,32,2L32,2z"
      />
      <path
        d="M47.988,28.741L36.012,20.86C33.256,19.047,31,20.263,31,23.563v2.555l-7.988-5.257C20.256,19.047,18,20.263,18,23.563
	v16.875c0,3.3,2.259,4.521,5.021,2.714L31,37.93v2.508c0,3.3,2.259,4.521,5.021,2.714l11.959-7.826
	C50.741,33.518,50.744,30.555,47.988,28.741z M45.858,33.128l-10.185,6.665C34.753,40.396,34,39.988,34,38.889v-4.508
	c0-1.1-0.753-1.507-1.674-0.905l-9.652,6.318C21.753,40.396,21,39.988,21,38.889V25.128c0-1.1,0.752-1.505,1.671-0.9l9.658,6.354
	c0.919,0.604,1.671,0.199,1.671-0.9v-4.554c0-1.1,0.752-1.505,1.671-0.9l10.19,6.705C46.78,31.537,46.779,32.525,45.858,33.128z"
      />
    </svg>
  </IconWrapper>
);

export default Next;