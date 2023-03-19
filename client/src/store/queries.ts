import axios, { AxiosResponse } from 'axios';
import { IDataByQuery } from '../fragments/BrowserPage/MediaResult/DownloadedUrl/DownloadedUrl.interface';
import { authLocalStorage } from '../utils/localStorage';
import {
  ICheckLoginQuery,
  ILoginDataDB,
  ILoginDTO,
  IRegisterData,
  IRegisterDTO
} from './queries.interface';

const instanceDB = axios.create({
  baseURL: 'http://194.28.224.185:7000'
  // baseURL: 'http://localhost:7000'
  // baseURL: 'http://192.168.0.100:7000'
  // baseURL: 'http://10.254.1.164:7000',
});
instanceDB.interceptors.request.use((config) => {
  config.headers['Authorization'] = authLocalStorage.getToken();
  return config;
});
export const loginDataDB = async ({
  nickname,
  password
}: ILoginDTO): Promise<ILoginDataDB> =>
  await instanceDB
    .post('/user/login', { nickname, password })
    .catch((e) => e.response);

export const registerDataDB = async (
  registerData: IRegisterDTO
  // ): Promise<IRegisterData> =>
): Promise<void | AxiosResponse<IRegisterData>> =>
  await instanceDB
    .post('/user/register', registerData)
    .catch((e) => e.response);

export const checkAuthDB = async (): Promise<ICheckLoginQuery> =>
  await instanceDB.get('/user/check');

export const allTracksByUserDB = async () => await instanceDB.get('/track');

export const checkTrackCountDB = async (): Promise<AxiosResponse<number>> =>
  await instanceDB.get('/track/count');

export const updatePositionTracksDB = async (replacedTrackIds: number[]) =>
  await instanceDB.post('/track/updatePos', { order: replacedTrackIds });

export const getUrlTrackStreamQuery = async (id: number) =>
  await instanceDB.post('/track/url', { trackId: id });

export const dataByLinkDB = async (link: string) =>
  await instanceDB.post('/track/download', { urlSrc: link });

export const uploadFileByLinkDB = async (data: IDataByQuery | string) =>
  await instanceDB.post('/track/upload_file', data);

export const sendTokenByConfirmDB = async (token: string) =>
  await instanceDB.post('/email/confirm', token);
