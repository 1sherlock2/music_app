import { Events, FragLoadingData } from 'hls.js';
import React, {
  forwardRef,
  TouchEventHandler,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react';
import formatTimer from '../../utils/formatTimer';
import { IAudioPayload } from '../AudioPayload/AudioPayload.interface';
import { ICurrentProgressTime } from './CurrentProgressTime.interface';
import s from './CurrentProgressTime.scss';

const CurrentProgressTime: React.FC<ICurrentProgressTime> = ({
  duration,
  trackProgress,
  setBlockSwipe,
  hlsLoad,
  changeCurrentTime
}) => {
  const processRef = useRef<HTMLDivElement>(null);
  const [bufferDurations, setBufferDurations] = useState(0);
  const [trackTime, setTrackTime] = useState<number>(trackProgress);
  const [progressPercent, setProgressPercent] = useState<number>(0);

  const hlsBufferDurations = useCallback(
    (_e, { targetBufferTime }) =>
      setBufferDurations(Number(targetBufferTime?.toFixed(2))),
    []
  );

  hlsLoad.fragsLoad(hlsBufferDurations);

  const durationForWidth = useMemo(() => {
    const percentDuration = (bufferDurations * 100) / duration;
    const roundDuration = Number(percentDuration.toFixed(1));
    return roundDuration ? (roundDuration > 100 ? 100 : roundDuration) : 0;
  }, [bufferDurations, duration]);

  const longTimer = useMemo(() => formatTimer(duration), [duration]);
  const progressTimer = useMemo(
    () => formatTimer(trackProgress),
    [trackProgress]
  );

  useEffect(() => {
    const durationFixed = Number(trackProgress.toFixed(3));
    setProgressPercent(Number(((durationFixed * 100) / duration).toFixed(3)));
  }, [trackProgress, duration]);

  const changeTime = (event: React.TouchEvent<HTMLDivElement>) => {
    const { clientX } = event.touches[0];
    const { width } = processRef.current?.getBoundingClientRect() as DOMRect;
    const percentProgress = Number(((clientX / width) * 100).toFixed(3));
    if (percentProgress > 100) {
      setProgressPercent(100);
    } else if (percentProgress < 0) {
      setProgressPercent(0);
    } else {
      setProgressPercent(percentProgress);
    }
    setTrackTime((duration * percentProgress) / 100);
  };

  const handleTouchMove: TouchEventHandler<HTMLDivElement> = (event) =>
    changeTime(event);

  const handleTouchStart: TouchEventHandler<HTMLDivElement> = (event) => {
    changeTime(event);
    setBlockSwipe(true);
  };
  const handleTouchEnd: TouchEventHandler<HTMLDivElement> = (event) => {
    setBlockSwipe(false);
    changeCurrentTime(trackTime);
  };
  return (
    <div className={s.currentTime}>
      <div className={s.currentTime_timer}>{`${progressTimer}-${
        duration ? longTimer : 0
      }`}</div>
      <div
        className={s.currentTime_process}
        ref={processRef}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onTouchStart={handleTouchStart}
      >
        <div className={s.loaded} style={{ width: `${durationForWidth}%` }} />
        <div className={s.progress} style={{ width: `${progressPercent}%` }} />
        <div className={s.thumb} style={{ left: `${progressPercent}%` }} />
      </div>
    </div>
  );
};

export default CurrentProgressTime;
