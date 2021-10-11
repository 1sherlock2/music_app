import axios from 'axios';
import { authLocalStorage } from '../utils/localStorage';
import { ILoginDTO } from '../fragments/Auth/Login/Login.interface';
import {
  ICheckLoginQuery,
  IGetTrackInfoSrc,
  ILoginDataDB
} from './queries.interface';

const instanceDB = axios.create({
  // baseURL: 'http://localhost:7000',
  baseURL: 'http://192.168.0.103:7000',
  headers: {
    Authorization: authLocalStorage.getToken()
  }
});

export const loginDataDB = async ({
  nickname,
  password
}: ILoginDataDB): Promise<ILoginDTO> =>
  await instanceDB.post('/auth/login', { nickname, password });

export const checkAuthDB = async (): Promise<ICheckLoginQuery> =>
  await instanceDB.get('/auth/check');

export const allTracksByUserDB = async () => await instanceDB.get('/track');
