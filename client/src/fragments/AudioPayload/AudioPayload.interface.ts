import { IallTraksByUser } from '../../store/index';

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
  generalIndexTrack?: number;
  setOpen: (value: boolean) => void;
  open: boolean;
}

export type INameAndArtistAudio = {
  artist?: string;
  name: string;
};

export type IRepeat = {
  oneLoop: string;
  allLoop: string;
  noLoop: string;
};
export interface IAudioPayload {
  goToNextTrack: () => void;
  goToPreviousTrack: () => void;
  setRepeat: (prev: string) => void;
  isChangeTrack?: boolean;
  repeat: keyof IRepeat;
  trackIndex?: number;
  currentTrack: {
    id: number;
    audio: string;
    img?: string;
  } & INameAndArtistAudio;
}

export interface ITouchY {
  startY?: number;
  endY?: number;
}
