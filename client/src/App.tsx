import React, { useEffect, useMemo, useState } from 'react';
import { useRouter } from './hoc/useRouter';
import s from './App.scss';

const App: React.FC = () => {
  const routes = useRouter();

  useEffect(() => {
    const body = document.getElementsByTagName('body')[0];
    body.classList.add(s.app);
  }, []);

  return <div className={s.app}>{routes}</div>;
};

export default App;
