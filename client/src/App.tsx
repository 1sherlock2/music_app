import React, { useEffect, useState } from 'react';
import AudioContainer from './fragments/AudioContainer';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { isAuthentication } from './store/index';
import { musics } from './audio/index';
import Auth from './fragments/Auth/Auth';
import s from './App.scss';
import { Redirect } from 'react-router';
import { useRouter } from './hoc/useRouter';

const App: React.FC = () => {
  const isAuth = useRecoilValue(isAuthentication);
  useEffect(() => {
    const body = document.getElementsByTagName('body')[0];
    body.classList.add(s.app);
  }, []);
  const routes = useRouter(isAuth);

  return (
    <div className={s.app}>
      {routes}
      {/* <AudioContainer musics={musics} /> */}
    </div>
  );
};

export default App;
