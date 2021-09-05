import axios from 'axios';
import { ILoginDTO } from '~/fragments/Auth/Login/Login.interface';
import { IloginDataDB } from './queries.interface';

const instance = axios.create({
  baseURL: 'http://localhost:7000'
});

export const loginDataDB = async ({
  nickname,
  password
}: IloginDataDB): Promise<ILoginDTO> =>
  await instance.post('/auth/login', { nickname, password });
