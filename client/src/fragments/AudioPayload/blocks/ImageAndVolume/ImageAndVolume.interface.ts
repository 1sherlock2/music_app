import { IAudioPayload } from '../../AudioPayload.interface';

type IIncludesProps = Pick<IAudioPayload, 'volume' | 'setVolume'>;
export type IImageAndVolumeProps = { img?: string } & IIncludesProps;
