import React, { useCallback, useEffect, useRef } from 'react';
import Hls from 'hls.js';
import hlsConfig from '../fragments/AudioPayload/utils/hlsConfig';
import { IGetDuration } from './types/useHlsLoad.interface';

const useHlsLoad = (audioRef: any, urlStream: string) => {
  const hlsRef = useRef(new Hls(hlsConfig));

  return (hlsOptions: IGetDuration) => {
    useEffect(() => {
      if (Hls.isSupported()) {
        hlsRef.current.attachMedia(audioRef?.current);
        hlsRef.current.on(Hls.Events.MEDIA_ATTACHED, (_e, data) => {
          const { media } = data;
          audioRef.current = media;
          hlsRef.current.loadSource(urlStream);
          if (hlsOptions?.hlsSetDuration) {
            hlsRef.current.on(
              Hls.Events.LEVEL_LOADED,
              hlsOptions.hlsSetDuration
            );
          }
          return;
        });
      }
    }, [hlsOptions?.hlsSetDuration, urlStream]);
    return useCallback(({ fragLoading }: { fragLoading: () => void }) => {
      // if ()
      hlsRef.current.on(Hls.Events.FRAG_LOADING, fragLoading);
    }, []);
  };
};

export default useHlsLoad;
