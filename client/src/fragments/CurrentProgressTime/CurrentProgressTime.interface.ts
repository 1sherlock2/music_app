import { IAudioPayload } from '../AudioPayload/AudioPayload.interface';

type IncludesProps =
  | 'changeCurrentTime'
  | 'duration'
  | 'trackProgress'
  | 'setBlockSwipe'
  | 'hlsLoad';
export type ICurrentProgressTime = Pick<IAudioPayload, IncludesProps>;
