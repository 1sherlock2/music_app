import React, { SetStateAction, Suspense, useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import {
  loginPassword,
  loginText,
  responseAuth,
  setAuthData,
  stateQuery
} from '../../../store/index';
import Button from '../../../components/Button/Button';
import Input from '../../../components/Input/Input';
import s from './Login.scss';
import { loginDataDB } from '../../../store/queries';
import { ILoginDTO } from './Login.interface';
import { Loader_1 } from '../../../loader/Loader_1';
import { Redirect } from 'react-router';
import { authLocalStorage } from '../../../utils/localStorage';

const Login = () => {
  const [nicknameInput, setNicknameInput] = useRecoilState(loginText);
  const [password, setPassword] = useRecoilState(loginPassword);
  const authDatas = useSetRecoilState(setAuthData);
  const responseAuth = useRecoilValue(stateQuery);
  const [errorAuth, setErrorAuth] =
    useState<SetStateAction<boolean | string>>(false);
  const [loginLoading, setloginLoading] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setloginLoading(true);
    await authDatas({ nickname: nicknameInput, password });
    setloginLoading(false);
    return;
  };

  useEffect(() => {
    if (nicknameInput && password) {
      const { success, message } = responseAuth;
      console.log('responseAuth', responseAuth);
      if (!success) {
        setErrorAuth(message);
      } else if (success) {
        return <Redirect to="/" />;
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
