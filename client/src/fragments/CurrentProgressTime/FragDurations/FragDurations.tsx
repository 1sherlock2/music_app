import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { IHlsBufferDurations } from '../../../hooks/types/useHlsLoad.interface';
import { FragDurationsProps } from './FragDurations.interface';
import s from './FragDurations.scss';

const FragDurations = ({ hlsFragLoader, allDuration }: FragDurationsProps) => {
  const [bufferDurations, setBufferDurations] = useState(0);

  const hlsBufferDurations = useCallback(
    (_: any, { targetBufferTime }: IHlsBufferDurations) =>
      setBufferDurations(Number(targetBufferTime.toFixed(1))),
    []
  );

  useEffect(() => {
    hlsFragLoader({ fragLoading: hlsBufferDurations });
  }, []);

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
