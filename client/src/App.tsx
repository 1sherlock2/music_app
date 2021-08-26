import React, { useEffect, useState } from 'react';
import AudioContainer from './fragments/AudioContainer';
import s from './App.scss';
import { musics } from './audio/index';
import Auth from './fragments/Auth/Auth';

const App: React.FC = () => {
  useEffect(() => {
    const body = document.getElementsByTagName('body')[0];
    body.classList.add(s.app);
  }, []);
  return (
    <div className={s.app}>
      <Auth />
      {/* <AudioContainer musics={musics} /> */}
    </div>
  );
};

export default App;
