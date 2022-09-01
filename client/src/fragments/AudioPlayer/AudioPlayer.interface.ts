import { IAudioPayload } from '../AudioPayload/AudioPayload.interface';

type IncludesProps =
  | 'isPlaying'
  | 'setIsPlaying'
  | 'goToNextTrack'
  | 'goToPreviousTrack'
  | 'handleClickRep'
  | 'repeat';
export type IAudioPlayer = Pick<IAudioPayload, IncludesProps>;
