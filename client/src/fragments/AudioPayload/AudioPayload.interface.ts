import { IallTraksByUser } from '~/store';

export interface IintervalRef<T> {
  current: T;
}
export interface IDurationTarget {
  target: {
    duration: React.SetStateAction<number>;
  };
}

export interface IPlaylistPopup {
  allTracks?: IallTraksByUser[] | undefined;
  generalIndexTrack?: number,
  setOpen: (value: boolean) => void;
  open: boolean;
}
export interface IAudioPayload {
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
