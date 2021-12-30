import { Events, FragLoadingData } from 'hls.js';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { FragDurationsProps } from './FragDurations.interface';
import s from './FragDurations.scss';

const FragDurations = ({ hlsLoad, allDuration }: FragDurationsProps) => {
  const [bufferDurations, setBufferDurations] = useState(0);

  const hlsBufferDurations = useCallback(
    (_e: Events.FRAG_LOADING, { targetBufferTime }: FragLoadingData) =>
      setBufferDurations(Number(targetBufferTime?.toFixed(1))),
    []
  );
  hlsLoad.fragsLoad(hlsBufferDurations);

  const durationForWith = useMemo(() => {
    const percentDuration = (bufferDurations * 100) / allDuration;
    const roundDuration = Number(percentDuration.toFixed(1));
    return roundDuration ? (roundDuration > 100 ? 100 : roundDuration) : 0;
  }, [bufferDurations, allDuration]);

  return (
    <div className={s.fragDurations} style={{ width: `${durationForWith}%` }} />
  );
};
export default FragDurations;
