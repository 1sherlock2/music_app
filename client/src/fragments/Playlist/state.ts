import { AxiosResponse } from 'axios';
import { atom, DefaultValue, selector } from 'recoil';
import keyState from '../../store/keyState';
import {
  allTracksByUserDB,
  checkTrackCountDB,
  updatePositionTracksDB
} from '../../store/queries';
import { IallTraksByUser } from './Playlist.interface';

const allTracksByDB = async (): Promise<AxiosResponse<IallTraksByUser[]>> => {
  return await allTracksByUserDB();
};

const tracksCount = atom({
  key: keyState.TRACKS_COUNT,
  default: 0
});

const allTraksByUser = selector({
  key: keyState.ALL_TRACKS_BY_USER,
  get: async () => {
    const { data } = await allTracksByDB();
    return data;
  },
  // get: ({ get }) => {
  //   return get(allTracksByUserAtom);
  // },
  set: ({ set }, newValue: IallTraksByUser[] | DefaultValue) => {
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
  default: allTraksByUser || [],
  // default:
  //   selector({
  //     key: keyState.ALL_TRACKS_BY_USER_DEFAULT,
  //     get: async () => {
  //       const { data } = await allTracksByDB();
  //       return data;
  //     }
  //   }) || [],
  effects_UNSTABLE: [
    ({ setSelf, onSet }) => {
      onSet((newValue, oldValue) => {
        if (Array.isArray(oldValue) && newValue.length !== oldValue.length) {
          setSelf(newValue);
        }
      });
    }
  ]
});

export { allTraksByUser, allTracksByUserAtom, tracksCount };
