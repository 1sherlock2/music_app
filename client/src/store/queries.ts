import axios from 'axios';
import { ILoginDTO } from '~/fragments/Auth/Login/Login.interface';
import { ILoginDataDB } from './queries.interface';

const instance = axios.create({
  baseURL: 'http://localhost:7000'
});

export const loginDataDB = async ({
  nickname,
  password
}: ILoginDataDB): Promise<ILoginDTO> =>
  await instance.post('/auth/login', { nickname, password });
