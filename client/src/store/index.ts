import { atom, selector, selectorFamily, useRecoilValue } from 'recoil';

const loginText = atom({ key: 'loginText', default: '' });
const loginPassword = atom({ key: 'loginPassword', default: '' });
const isAuthentication = atom({ key: 'authStatus', default: false });
const isLoginLoading = atom({ key: 'loginLoading', default: false });
export { loginText, loginPassword, isAuthentication, isLoginLoading };
