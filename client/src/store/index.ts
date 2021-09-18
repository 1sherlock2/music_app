import { atom, selector } from 'recoil';
import { authLocalStorage } from '../utils/localStorage';
import { loginDataDB } from './queries';

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
    const { success, token, nickname: responseNick } = response.data;
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

const authResponse = atom({ key: 'authResponse', default: stateQuery });

export {
  loginText,
  loginPassword,
  isAuthentication,
  stateQuery,
  setAuthData,
  authResponse
};
