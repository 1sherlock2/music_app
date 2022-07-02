import { AxiosResponse } from 'axios';
import { atom, selector, selectorFamily } from 'recoil';
import { authLocalStorage } from '../utils/localStorage';
import {
  allTracksByUserDB,
  checkAuthDB,
  getUrlTrackStreamQuery,
  loginDataDB,
  registerDataDB,
  updatePositionTracksDB
} from './queries';
import responseMessages from './responseMessages';

const loginText = atom({ key: 'loginText', default: '' });
const loginPassword = atom({ key: 'loginPassword', default: '' });
const isAuthentication = atom({ key: 'authStatus', default: false });

const setRegistrData = atom({
  key: 'setRegistrData',
  default: { nickname: '', email: '', password: '' }
});

const responseRegister = selector({
  key: 'responseRegister',
  get: async ({ get }) => {
    const { nickname, email, password } = get(setRegistrData);
    if (nickname && email && password) {
      const response = await registerDataDB({ nickname, email, password });
      const {
        data: { success, message }
      } = response;
      return { success, message };
    }
  }
});

const setAuthData = atom({
  key: 'setAuthData',
  default: { nickname: '', password: '' }
});

const stateQuery = selector({
  key: 'stateQuery',
  get: async ({ get }) => {
    const { nickname, password } = get(setAuthData);
    if (!nickname || !password) {
      return { success: false, message: responseMessages.loginError };
    }

    const response = await loginDataDB({ nickname, password });
    const {
      success,
      accessToken: token,
      nickname: responseNick
    } = response.data;
    if (!success) {
      return {
        success,
        message: responseMessages.loginError
      };
    }
    authLocalStorage.setStorage(token, responseNick);
    return { success, message: 'OK' };
  }
});

const checkAuth = selector({
  key: 'checkAuth',
  get: async () => {
    const response = await checkAuthDB();
    const { success, userId } = response?.data;
    if (success) {
      return true;
    } else if (!success) {
      return false;
    }
  }
});

export type IallTraksByUser = {
  id: number;
  name: string;
  artist?: string;
  img?: string;
  audio: string;
};

const allTraksByUser = selector({
  key: 'allTraksByUser',
  get: async () => {
    const { data }: AxiosResponse<IallTraksByUser[]> =
      await allTracksByUserDB();
    return data;
  },
  set: ({ set }, newValue) => {
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
  key: 'allTracksByUserAtom',
  default: allTraksByUser
});

const getUrlTrackStream = selectorFamily({
  key: 'getUrlTrackStream',
  get: (id: number) => async () => {
    const { data } = await getUrlTrackStreamQuery(id);
    if (!data) {
      throw new Error('track url is not obtained');
    }
    return data;
  }
});

const initialTranslateX = atom<boolean>({
  key: 'changeTranslate',
  default: false
});

export {
  loginText,
  loginPassword,
  isAuthentication,
  stateQuery,
  setAuthData,
  checkAuth,
  getUrlTrackStream,
  allTraksByUser,
  allTracksByUserAtom,
  setRegistrData,
  responseRegister,
  initialTranslateX
};
