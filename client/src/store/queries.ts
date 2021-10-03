import axios from 'axios';
import { authLocalStorage } from '../utils/localStorage';
import { ILoginDTO } from '../fragments/Auth/Login/Login.interface';
import { ILoginDataDB } from './queries.interface';

const instance = axios.create({
  baseURL: 'http://localhost:7000',
  headers: {
    Authorization: `Bearer ${authLocalStorage.getToken()}`
  }
});

export const loginDataDB = async ({
  nickname,
  password
}: ILoginDataDB): Promise<ILoginDTO> =>
  await instance.post('/auth/login', { nickname, password });

export const checkAuthDB = async (): Promise<boolean> =>
  await instance.get('/auth/check');
