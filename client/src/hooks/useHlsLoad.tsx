import { useEffect, useRef } from 'react';
import Hls, { Events, LevelLoadedData } from 'hls.js';
import hlsConfig from '../fragments/AudioPayload/utils/hlsConfig';
import { IHlsLoad } from './types/useHlsLoad.interface';

const useHlsLoad = (
  audioRef: { current: HTMLAudioElement },
  urlStream: string
): IHlsLoad => {
  const hlsRef = useRef(new Hls(hlsConfig));

  return {
    hlsSetDuration: (durationFunc) => {
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
        } else if (
          audioRef?.current.canPlayType('application/vnd.apple.mpegurl')
        ) {
          audioRef.current.src = urlStream;
        }
      }, [durationFunc, urlStream]);
    },
    fragsLoad: (fragLoadingFunc) => {
      useEffect(() => {
        if (fragLoadingFunc) {
          hlsRef.current.on(Hls.Events.FRAG_LOADING, fragLoadingFunc);
        }
      }, []);
    },
    startPlay: (hlsStartPlayAudio) => {
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
