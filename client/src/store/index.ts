import {
  atom,
  AtomOptions,
  RecoilState,
  selector,
  selectorFamily,
  useRecoilStateLoadable,
  useRecoilValue
} from 'recoil';
import { ILoginDTO } from '../fragments/Auth/Login/Login.interface';
import { authLocalStorage } from '../utils/localStorage';
import { loginDataDB } from './queries';

const loginText = atom({ key: 'loginText', default: '' });
const loginPassword = atom({ key: 'loginPassword', default: '' });
const isAuthentication = atom({ key: 'authStatus', default: false });
const responseAuth: RecoilState<ILoginDTO> = atom({
  key: 'responseAuth',
  default: { success: false, nickname: '', token: '' }
});

const setAuthData = atom({
  key: 'setAuthData',
  default: { nickname: '', password: '' }
});
// const authData = selector({
//   key: 'authData',
//   get: ({ get }) => {
//     return {
//       nickname: get(loginText),
//       password: get(loginPassword)
//     };
//   }
// });
const stateQuery = selector({
  key: 'stateQuery',
  get: async ({ get }) => {
    const { nickname, password } = get(setAuthData);
    const response = await loginDataDB({ nickname, password });
    console.log('response', response);
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

export {
  loginText,
  loginPassword,
  isAuthentication,
  responseAuth,
  // authData,
  stateQuery,
  setAuthData
};
