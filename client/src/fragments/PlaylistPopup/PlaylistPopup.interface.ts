import { IallTraksByUser } from '../Playlist/Playlist.interface';

export type IPlaylistPopup = {
  allTracks?: IallTraksByUser[] | [];
  generalIndexTrack?: number;
  setOpen: (value: boolean) => void;
};
