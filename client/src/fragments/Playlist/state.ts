import { AxiosResponse } from 'axios';
import { atom, DefaultValue, selector } from 'recoil';
import keyState from '../../store/keyState';
import { allTracksByUserDB, updatePositionTracksDB } from '../../store/queries';
import { IallTraksByUser } from './Playlist.interface';

const allTracksByDB = async (): Promise<AxiosResponse<IallTraksByUser[]>> => {
  return await allTracksByUserDB();
};

const allTraksByUser = selector({
  key: keyState.ALL_TRACKS_BY_USER,
  get: async () => {
    console.log('data');
    const { data } = await allTracksByDB();
    return data;
  },
  set: ({ set, get }, newValue: IallTraksByUser[] | DefaultValue) => {
    console.log('set');
    (async () => {
      const availableTracks = get(allTracksByUserAtom);
      const { data } = await allTracksByDB();
      if (data.length > availableTracks.length) {
        set(allTracksByUserAtom, data);
      }
    })();
    const replacedTrackIds: false | number[] =
      Array.isArray(newValue) && newValue.map((el: IallTraksByUser) => el.id);
    if (replacedTrackIds && replacedTrackIds.length) {
      (async () => {
        await updatePositionTracksDB(replacedTrackIds);
      })();
      set(allTracksByUserAtom, newValue);
    }
  }
});

const allTracksByUserAtom = atom<IallTraksByUser[]>({
  key: keyState.ALL_TRACKS_BY_USER_ATOM,
  default: allTraksByUser || []
});

export { allTraksByUser, allTracksByUserAtom };
