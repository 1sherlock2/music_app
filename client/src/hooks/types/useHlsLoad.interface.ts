import { Events, FragLoadingData, LevelLoadedData } from 'hls.js';

type IFragLoadingFunc = (
  _e: Events.FRAG_LOADING,
  { targetBufferTime }: FragLoadingData
) => void;

export type IHlsLoad = {
  hlsSetDuration: (
    durationFunc: (event: Events.LEVEL_LOADED, data: LevelLoadedData) => void
  ) => undefined | void;
  fragsLoad: (fragLoadingFunc: IFragLoadingFunc) => void;
  startPlay: (hlsStartPlayAudio: () => void) => void;
  detachAudio: () => void;
};
export type IHlsLoadArgs = {
  audioRef: { current: HTMLAudioElement };
  urlStream: string;
};
