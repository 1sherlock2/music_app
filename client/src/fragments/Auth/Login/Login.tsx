import React, { SetStateAction, useEffect, useState } from 'react';
import {
  useRecoilState,
  useRecoilValue,
  useRecoilValueLoadable,
  useSetRecoilState
} from 'recoil';
import {
  authResponse,
  isAuthentication,
  loginPassword,
  loginText,
  setAuthData,
  stateQuery
} from '../../../store/index';
import Input from '../../../components/Input/Input';
import s from './Login.scss';
import { IResponseAuth } from './Login.interface';
import { Loader_1 } from '../../../loader/Loader_1';
import { Redirect, useHistory } from 'react-router';

const Login = () => {
  const [nicknameInput, setNicknameInput] = useRecoilState(loginText);
  const [password, setPassword] = useRecoilState(loginPassword);
  const authDatas = useSetRecoilState(setAuthData);
  const responseAuth = useRecoilValueLoadable(authResponse);
  const [isAuth, setIsAuth] = useRecoilState(isAuthentication);
  const [errorAuth, setErrorAuth] =
    useState<SetStateAction<boolean | string>>(false);
  const [loginLoading, setloginLoading] = useState(false);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setloginLoading(true);
    authDatas({ nickname: nicknameInput, password });
  };

  useEffect((): void => {
    if (nicknameInput && password) {
      console.log(responseAuth);
      const { contents, state } = responseAuth;
      switch (state) {
        case 'loading':
          setloginLoading(true);
          break;
        case 'hasValue':
          const { success, message } = contents;
          if (!success) {
            setErrorAuth(message);
            setIsAuth(false);
            setloginLoading(false);
          }
          setIsAuth(true);
          setloginLoading(false);
          break;
        default:
          return;
      }
    }
  }, [responseAuth]);

  return (
    <div className={s.loginForm}>
      <form onSubmit={handleSubmit} className={s.loginForm_form}>
        <Input
          type="text"
          value={nicknameInput}
          onChange={setNicknameInput}
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
          validate="password"
        />
        <div className={s.handleSubmit}>
          <Input type="submit" value="Entry" size="m" style="pink" />
          {loginLoading && <Loader_1 />}
        </div>
        {errorAuth && <div className={s.errorAuth}>{errorAuth}</div>}
      </form>
    </div>
  );
};

export default Login;
