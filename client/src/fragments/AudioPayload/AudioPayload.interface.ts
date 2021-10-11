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
  setOpen: (value: boolean) => void;
  open: boolean;
  goToNextTrack: () => void;
  goToPreviousTrack: () => void;
  trackIndex: number;
  currentTrack: {
    artist?: string;
    name: string;
    audio: string;
    img?: string;
  };
}

export interface ITouchY {
  startY?: number;
  endY?: number;
}
