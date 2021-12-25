import React, { forwardRef, useEffect, useMemo, useRef, useState } from 'react';
import formatTimer from '../../utils/formatTimer';
import s from './CurrentProgressTime.scss';
import FragDurations from './FragDurations/FragDurations';

const CurrentProgressTime = ({
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

  const hlsFragLoader = hlsLoad();

  return (
    <div className={s.currentTime}>
      <div className={s.currentTime_timer}>{`${progressTimer}-${
        duration ? longTimer : 0
      }`}</div>
      <div className={s.currentTime_input}>
        <input
          type="range"
          min="0"
          onChange={(e) => changeCurrentTime(e.target.value)}
          onMouseUp={onScrubEnd}
          max={duration ? duration : `${duration}`}
          value={trackProgress}
        />
        <FragDurations hlsFragLoader={hlsFragLoader} allDuration={duration} />
      </div>
    </div>
  );
};

export default CurrentProgressTime;
