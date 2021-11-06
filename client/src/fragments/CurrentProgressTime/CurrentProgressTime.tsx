import React, { useMemo } from 'react';
import formatTimer from '../../utils/formatTimer';
import s from './CurrentProgressTime.scss';

const CurrentProgressTime = ({
  onScrubEnd,
  duration,
  trackProgress,
  trackStyling,
  changeCurrentTime
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
          onChange={(e) => changeCurrentTime(e.target.value)}
          onMouseUp={onScrubEnd}
          max={duration ? duration : `${duration}`}
          value={trackProgress}
          style={trackStyling}
        />
      </div>
    </div>
  );
};

export default CurrentProgressTime;
