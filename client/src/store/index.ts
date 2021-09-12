import {
  atom,
  RecoilState,
  selector,
  selectorFamily,
  useRecoilValue
} from 'recoil';
import { ILoginDTO } from '~/fragments/Auth/Login/Login.interface';
import { loginDataDB } from './queries';

const loginText = atom({ key: 'loginText', default: '' });
const loginPassword = atom({ key: 'loginPassword', default: '' });
const isAuthentication = atom({ key: 'authStatus', default: false });
const responseAuth: RecoilState<ILoginDTO> = atom({
  key: 'responseAuth',
  default: { success: false, nickname: '', token: '' }
});

export { loginText, loginPassword, isAuthentication, responseAuth };
