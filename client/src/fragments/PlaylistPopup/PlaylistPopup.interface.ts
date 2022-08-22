import { IallTraksByUser } from '../../store';

export type IPlaylistPopup = {
  allTracks?: IallTraksByUser[] | [];
  generalIndexTrack?: number;
  setOpen: (value: boolean) => void;
};
