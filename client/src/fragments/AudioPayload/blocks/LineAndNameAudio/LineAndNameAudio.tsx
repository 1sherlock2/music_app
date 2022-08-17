import React, { forwardRef, TouchEventHandler, useEffect, useRef } from 'react';
import { INameAndArtistAudio } from '../../AudioPayload.interface';
import s from './LineAndNameAudio.scss';

const LineAndNameAudio: React.FC<INameAndArtistAudio> = ({ name, artist }) => {
  return (
    <div className={s.audioName}>
      <div className={s.audioName_line} />
      <div className={s.audioName_title}>{`${name} - ${artist}`}</div>
    </div>
  );
};

export default LineAndNameAudio;
