import React, { useEffect, useMemo, useState } from 'react';
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
  console.log(isAuth)
  const routes = useMemo(() => useRouter(isAuth), [isAuth]);

  useEffect(() => {
    const body = document.getElementsByTagName('body')[0];
    body.classList.add(s.app);
  }, []);

  return (
    <div className={s.app}>
      {routes}
    </div>
  );
};

export default App;
