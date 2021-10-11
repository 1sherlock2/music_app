import { IallTraksByUser } from '~/store';

export interface IintervalRef<T> {
  current: T;
}
export interface IDurationTarget {
  target: {
    duration: React.SetStateAction<number>;
  };
}
export interface IAudioPayload {
  allTracks: IallTraksByUser[];
  generalIndexTrack: number;
  setOpen: (value: boolean) => void;
  open: boolean;
}

export interface ITouchY {
  startY?: number;
  endY?: number;
}
