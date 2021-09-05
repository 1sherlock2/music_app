import React, { SetStateAction, useCallback, useMemo, useState } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import {
  isAuthentication,
  loginPassword,
  loginText,
  isLoginLoading
} from '../../../store/index';
import Button from '../../../components/Button/Button';
import Input from '../../../components/Input/Input';
import s from './Login.scss';
import { loginDataDB } from '../../../store/queries';
import { ILoginDTO } from './Login.interface';
import { Loader_1 } from '../../../loader/Loader_1';

const Login = () => {
  const [nickname, setNickname] = useRecoilState(loginText);
  const [password, setPassword] = useRecoilState(loginPassword);
  const setStatus = useSetRecoilState(isAuthentication);
  const [loginLoading, setloginLoading] = useRecoilState(isLoginLoading);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setloginLoading(true);
    const response: ILoginDTO = await loginDataDB({ nickname, password });
    if (!response?.data.success) {
      setStatus(false);
      setloginLoading(false);
    }
    setStatus(true);
    setloginLoading(false);
  };

  return (
    <div className={s.loginForm}>
      <form onSubmit={handleSubmit} className={s.loginForm_form}>
        <Input
          type="text"
          value={nickname}
          onChange={setNickname}
          placeholder="nickname"
          size="m"
          closeSize
        />
        <Input
          type="password"
          value={password}
          onChange={setPassword}
          placeholder="password"
          size="m"
          closeSize
        />
        <div className={s.handleSubmit}>
          <Input type="submit" value="Entry" size="m" style="pink" />
          {loginLoading && <Loader_1 />}
        </div>
      </form>
    </div>
  );
};

export default Login;
