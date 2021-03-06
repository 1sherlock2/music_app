import axios from 'axios';
import { authLocalStorage } from '../utils/localStorage';
import {
  ICheckLoginQuery,
  ILoginDataDB,
  ILoginDTO,
  IRegisterData,
  IRegisterDTO
} from './queries.interface';

const instanceDB = axios.create({
  baseURL: 'http://localhost:7000',
  // baseURL: 'http://192.168.0.105:7000',
  // baseURL: 'http://10.254.1.164:7000',
  headers: {
    Authorization: authLocalStorage.getToken()
  }
});

export const loginDataDB = async ({
  nickname,
  password
}: ILoginDTO): Promise<ILoginDataDB> =>
  await instanceDB.post('/user/login', { nickname, password });

export const registerDataDB = async (
  registerData: IRegisterDTO
): Promise<IRegisterData> =>
  await instanceDB.post('/user/register', registerData);

export const checkAuthDB = async (): Promise<ICheckLoginQuery> =>
  await instanceDB.get('/user/check');

export const allTracksByUserDB = async () => await instanceDB.get('/track');
export const updatePositionTracksDB = async (replacedTrackIds: number[]) =>
  await instanceDB.post('/track/updatePos', { order: replacedTrackIds });

export const getUrlTrackStreamQuery = async (id: number) =>
  await instanceDB.post('/track/url', { trackId: id });
