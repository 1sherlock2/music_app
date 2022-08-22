import { IAudioPayload } from '../AudioPayload/AudioPayload.interface';

type IncludesProps =
  | 'isPlaying'
  | 'setIsPlaying'
  | 'goToNextTrack'
  | 'goToPreviousTrack'
  | 'setRepeat'
  | 'repeat';
export type IAudioPlayer = Pick<IAudioPayload, IncludesProps>;
