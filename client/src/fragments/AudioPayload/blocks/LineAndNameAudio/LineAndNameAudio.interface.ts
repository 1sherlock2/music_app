import { Dispatch, MutableRefObject, SetStateAction } from 'react';
import { IAudioPayload } from '../../AudioPayload.interface';

type IncludesProps =
  | 'setTopPosition'
  | 'setTransformByCloseY'
  | 'defaultTopPosition'
  | 'fullHeight';
type INameAndArtistAudio = {
  artist?: string;
  name: string;
};

export type ILineAndNameProps = Pick<IAudioPayload, IncludesProps> &
  INameAndArtistAudio;
