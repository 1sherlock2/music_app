import { AxiosResponse } from 'axios';
import { atom, selector, selectorFamily } from 'recoil';
import { authLocalStorage } from '../utils/localStorage';
import {
  allTracksByUserDB,
  checkAuthDB,
  getUrlTrackStreamQuery,
  loginDataDB
} from './queries';

const loginText = atom({ key: 'loginText', default: '' });
const loginPassword = atom({ key: 'loginPassword', default: '' });
const isAuthentication = atom({ key: 'authStatus', default: false });

const setAuthData = atom({
  key: 'setAuthData',
  default: { nickname: '', password: '' }
});

const stateQuery = selector({
  key: 'stateQuery',
  get: async ({ get }) => {
    const { nickname, password } = get(setAuthData);
    const response = await loginDataDB({ nickname, password });
    const {
      success,
      accessToken: token,
      nickname: responseNick
    } = response.data;
    if (!success) {
      return {
        success,
        message: `This login or password is not correct. Please repeat user data or
      switch to register form`
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
      return String(userId);
    } else if (!success) {
      return null;
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
  }
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

export {
  loginText,
  loginPassword,
  isAuthentication,
  stateQuery,
  setAuthData,
  checkAuth,
  getUrlTrackStream,
  allTraksByUser
};
