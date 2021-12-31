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

export interface INameAndArtistAudio {
  artist?: string;
  name: string;
}
export interface IAudioPayload {
  goToNextTrack: () => void;
  goToPreviousTrack: () => void;
  trackIndex: number;
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
