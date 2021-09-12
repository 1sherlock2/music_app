import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { loginPassword, loginText, responseAuth } from '../../../store/index';
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
  const [responseData, setResponseData] = useRecoilState(responseAuth);
  const [errorAuth, setErrorAuth] = useState(false);
  const [loginLoading, setloginLoading] = useState(false);
  console.log('errorAuth', errorAuth);
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setloginLoading(true);
    const {
      success,
      nickname,
      accessToken: token
    }: ILoginDTO = await loginDataDB({
      nickname: nicknameInput,
      password
    });
    setResponseData({ success, nickname, token });
  };

  useEffect(() => {
    const { success, token, nickname } = responseData;
    if (!success) {
      setloginLoading(false);
    }
    setloginLoading(false);
    authLocalStorage.setStorage(token, nickname);
  }, [responseData]);

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
        {errorAuth && (
          <div className={s.errorAuth}>
            This login or password is not correct. Please repeat user data or
            switch to register form
          </div>
        )}
      </form>
    </div>
  );
};

export default Login;
