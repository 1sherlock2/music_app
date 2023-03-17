import { AxiosResponse } from 'axios';
import { atom, selector, selectorFamily } from 'recoil';
import { authLocalStorage } from '../utils/localStorage';
import keyState from './keyState';
import {
  allTracksByUserDB,
  checkAuthDB,
  getUrlTrackStreamQuery,
  loginDataDB,
  registerDataDB,
  updatePositionTracksDB
} from './queries';
import responseMessages from './responseMessages';

const isAuthentication = atom({ key: keyState.AUTH_STATUS, default: false });

const setRegistrData = atom({
  key: keyState.SET_REGISTER_DATA,
  default: { nickname: '', email: '', password: '' }
});

const responseRegister = selector({
  key: keyState.RESPONSE_REGISTER,
  get: async ({ get }) => {
    const registerData = get(setRegistrData);

    if (Object.values(registerData).filter(Boolean).length) {
      const response = await registerDataDB(registerData);
      if (response?.data) {
        const {
          data: { success, message }
        } = response;
        if (!success) {
          return { success: false, message };
        }
        return { success, message };
      }
    }
  }
});

const setAuthData = atom({
  key: keyState.SET_AUTH_DATA,
  default: { nickname: '', password: '' }
});

const loginQuery = selector({
  key: keyState.STATE_QUERY,
  get: async ({ get }) => {
    const { nickname, password } = get(setAuthData);
    if (!nickname || !password) {
      return { success: false, message: responseMessages.loginError };
    }

    const response = await loginDataDB({ nickname, password });
    if (response) {
      const {
        success,
        accessToken: token,
        nickname: responseNick
      } = response?.data;
      if (!success) {
        return {
          success,
          message: responseMessages.loginError
        };
      }
      authLocalStorage.setStorage(token, responseNick);
      return { success, message: 'OK' };
    }
  }
});

const checkAuth = selector({
  key: keyState.CHECK_AUTH,
  get: async () => {
    try {
      const response = await checkAuthDB();
      const { success } = response?.data;
      if (success) {
        return true;
      } else if (!success) {
        return false;
      }
    } catch (e) {
      return false;
    }
  }
});

const getUrlTrackStream = selectorFamily({
  key: keyState.GET_URL_TRACK_STREAM,
  get: (id: number) => async () => {
    const { data } = await getUrlTrackStreamQuery(id);
    if (!data) {
      throw new Error('track url is not obtained');
    }
    return data;
  }
});

export {
  isAuthentication,
  loginQuery,
  setAuthData,
  checkAuth,
  getUrlTrackStream,
  setRegistrData,
  responseRegister
};
