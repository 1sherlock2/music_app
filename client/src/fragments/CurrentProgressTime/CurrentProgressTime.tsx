import React, { forwardRef, useEffect, useMemo, useRef, useState } from 'react';
import formatTimer from '../../utils/formatTimer';
import { IAudioPayload } from '../AudioPayload/AudioPayload.interface';
import { ICurrentProgressTime } from './CurrentProgressTime.interface';
import s from './CurrentProgressTime.scss';
import FragDurations from './FragDurations/FragDurations';

const CurrentProgressTime: React.FC<ICurrentProgressTime> = ({
  onScrubEnd,
  duration,
  trackProgress,
  changeCurrentTime,
  hlsLoad
}) => {
  const longTimer = useMemo(() => formatTimer(duration), [duration]);
  const progressTimer = useMemo(
    () => formatTimer(trackProgress),
    [trackProgress]
  );

  return (
    <div className={s.currentTime}>
      <div className={s.currentTime_timer}>{`${progressTimer}-${
        duration ? longTimer : 0
      }`}</div>
      <div className={s.currentTime_input}>
        <input
          type="range"
          min="0"
          onChange={changeCurrentTime}
          onMouseUp={onScrubEnd}
          max={duration ? duration : `${duration}`}
          value={trackProgress}
        />
        <FragDurations hlsLoad={hlsLoad} allDuration={duration} />
      </div>
    </div>
  );
};

export default CurrentProgressTime;
