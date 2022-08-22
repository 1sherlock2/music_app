import { IAudioPayload } from '../AudioPayload/AudioPayload.interface';

type IncludesProps =
  | 'onScrubEnd'
  | 'duration'
  | 'trackProgress'
  | 'changeCurrentTime'
  | 'hlsLoad';
export type ICurrentProgressTime = Pick<IAudioPayload, IncludesProps>;
