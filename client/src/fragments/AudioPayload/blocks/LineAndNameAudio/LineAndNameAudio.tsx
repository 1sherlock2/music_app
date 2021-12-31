import React, { forwardRef, TouchEventHandler, useEffect, useRef } from 'react';
import { INameAndArtistAudio } from '../../AudioPayload.interface';
import { ILineAndNameProps } from './LineAndNameAudio.interface';
import s from './LineAndNameAudio.scss';

const LineAndNameAudio: React.FC<INameAndArtistAudio & ILineAndNameProps> = ({
  name,
  artist,
  setTopPosition,
  differentValue,
  setTransformByCloseY,
  setOpen
}) => {
  const startPositionY = useRef<number>();
  const changePosY = useRef<number>();
  const handleTouchStartClose: TouchEventHandler<HTMLDivElement> = (e) => {
    const { clientY } = e.touches[0];
    startPositionY.current = clientY;
  };

  const handleTouchEventClose: TouchEventHandler<HTMLDivElement> = (e) => {
    const { clientY } = e.touches[0];
    changePosY.current = clientY - startPositionY.current;
    setTopPosition(changePosY.current);
  };

  const handleTouchEndClose: TouchEventHandler<HTMLDivElement> = (e) => {
    const { clientY } = e.changedTouches[0];
    if (startPositionY.current) {
      const differentPosY = clientY - startPositionY.current;
      if (differentPosY >= differentValue) {
        setTransformByCloseY(true);
        setTimeout(() => {
          setOpen(false);
        }, 100);
      }
    }
  };

  return (
    <div
      className={s.audioName}
      onTouchStart={handleTouchStartClose}
      onTouchEnd={handleTouchEndClose}
      onTouchMove={handleTouchEventClose}
    >
      <div className={s.audioName_line} />
      <div className={s.audioName_title}>{`${name} - ${artist}`}</div>
    </div>
  );
};

export default LineAndNameAudio;
