import React, { useEffect, useState } from 'react';
import AudioContainer from './fragments/AudioContainer';
import s from './App.scss';
import { musics } from './audio/index';

const App: React.FC = () => {
  console.log('musics', musics)
  useEffect(() => {
    const body = document.getElementsByTagName('body')[0];
    body.classList.add(s.app);
  }, []);
  return (
    <div className={s.app}>
      <AudioContainer musics={musics} />
    </div>
  );
};

export default App;
