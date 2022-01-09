import React, { SetStateAction, useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import {
  isAuthentication,
  loginPassword,
  loginText,
  setAuthData,
  stateQuery
} from '../../../store/index';
import Input from '../../../components/Input/Input';
import s from './Login.scss';
import { Loader_1 } from '../../../loader/Loader_1';
import { useHistory } from 'react-router';

const Login = () => {
  const [nicknameInput, setNicknameInput] = useRecoilState(loginText);
  const [password, setPassword] = useRecoilState(loginPassword);
  const authDatas = useSetRecoilState(setAuthData);
  const responseAuth = useRecoilValue(stateQuery);
  const [isAuth, setIsAuth] = useRecoilState(isAuthentication);
  const [errorAuth, setErrorAuth] =
    useState<SetStateAction<boolean | string>>(false);
  const [loginLoading, setloginLoading] = useState(false);
  const history = useHistory();

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setloginLoading(true);
    authDatas({ nickname: nicknameInput, password });
  };

  useEffect(() => {
    if (isAuth) {
      history.push('/');
    }
  }, [isAuth]);

  useEffect(() => {
    if (nicknameInput && password) {
      const { success, message } = responseAuth;
      if (!success) {
        setErrorAuth(message);
        setloginLoading(false);
        setIsAuth(false);
      } else {
        setloginLoading(false);
        setIsAuth(true);
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
          <Input type="submit" value="Sign in" size="l" style="pink" />
          {loginLoading && <Loader_1 />}
        </div>
        {errorAuth && <div className={s.errorAuth}>{errorAuth}</div>}
      </form>
    </div>
  );
};

export default Login;
