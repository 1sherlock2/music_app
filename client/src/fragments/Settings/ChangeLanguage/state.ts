import { atom } from 'recoil';
import keyState from '../../../store/keyState';

const changeLang = atom<boolean>({ key: keyState.CHANGE_LANG, default: false });

export { changeLang };
