import React, { SetStateAction, useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import {
  isAuthentication,
  loginQuery,
  setAuthData
} from '../../../store/index';
import Input from '../../../components/Input/Input';
import s from './Login.scss';
import { Loader_1 } from '../../../loader/Loader_1';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [nicknameInput, setNicknameInput] = useState('');
  const [password, setPassword] = useState('');
  const authDatas = useSetRecoilState(setAuthData);
  const responseAuth = useRecoilValue(loginQuery);
  const [isAuth, setIsAuth] = useRecoilState(isAuthentication);
  const [errorAuth, setErrorAuth] =
    useState<SetStateAction<boolean | string>>(false);
  const [loginLoading, setloginLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setloginLoading(true);
    authDatas({ nickname: nicknameInput, password });
  };

  useEffect(() => {
    if (isAuth) {
      navigate('/');
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
