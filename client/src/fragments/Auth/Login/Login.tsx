import { observer } from 'mobx-react';
import React, { SetStateAction, useState } from 'react';
import Button from '../../../components/Button/Button';
import Input from '../../../components/Input/Input';
import s from './Login.scss';

const Login = observer(() => {
  const [nickname, setNickname] = useState<HTMLInputElement>('');
  const [password, setPassword] = useState<HTMLInputElement>('');
  // const store = useRootStore()
  const handleSubmit = (e) => {
    console.log(nickname);
    console.log(password);
    e.preventDefault();
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
        {/* <Button>entry</Button> */}
        <Input type="submit" value="Entry" size="m" style="pink" />
      </form>
    </div>
  );
});

export default Login;
