import { useCallback, useEffect, useRef } from 'react';
import Hls, { Events, LevelLoadedData } from 'hls.js';
import hlsConfig from '../fragments/AudioPayload/utils/hlsConfig';

const useHlsLoad = (audioRef: any, urlStream: string) => {
  const hlsRef = useRef(new Hls(hlsConfig));

  return {
    hlsSetDuration: (
      durationFunc: (event: Events.LEVEL_LOADED, data: LevelLoadedData) => void
    ) => {
      useEffect(() => {
        if (Hls.isSupported()) {
          hlsRef.current.attachMedia(audioRef?.current);
          hlsRef.current.on(Hls.Events.MEDIA_ATTACHED, (_e, data) => {
            const { media } = data;
            audioRef.current = media;
            hlsRef.current.loadSource(urlStream);
            if (durationFunc) {
              hlsRef.current.on(Hls.Events.LEVEL_LOADED, durationFunc);
            }
            return;
          });
        }
      }, [durationFunc, urlStream]);
    },
    fragsLoad: useCallback(({ fragLoading }) => {
      useEffect(() => {
        if (fragLoading) {
          hlsRef.current.on(Hls.Events.FRAG_LOADING, fragLoading);
        }
      }, []);
    }, []),
    startPlay: (hlsStartPlayAudio: () => any) => {
      hlsRef.current.on(Hls.Events.BUFFER_CREATED, (_e, data) => {
        const bufferExist = data.tracks?.audio?.buffer;
        if (bufferExist) {
          hlsStartPlayAudio();
        }
      });
    },
    detachAudio: () => hlsRef.current.detachMedia()
  };
};

export default useHlsLoad;
