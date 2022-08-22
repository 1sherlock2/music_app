import { Events, LevelLoadedData } from 'hls.js';

export type IHlsLoad = {
  hlsSetDuration: (
    durationFunc: (event: Events.LEVEL_LOADED, data: LevelLoadedData) => void
  ) => undefined | void;
  fragsLoad: (fragLoadingFunc: () => void) => void;
  startPlay: (hlsStartPlayAudio: () => void) => void;
  detachAudio: () => void;
};
export type IHlsLoadArgs = {
  audioRef: { current: HTMLAudioElement };
  urlStream: string;
};
