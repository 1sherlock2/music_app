import React, { Suspense, useEffect, useMemo, useState } from 'react';
import { useRouter } from './hoc/useRouter';
import s from './App.scss';

const App: React.FC = () => {
  const routes = useRouter();

  useEffect(() => {
    const body = document.getElementsByTagName('body')[0];
    body.classList.add(s.app);
  }, []);

  return(
    <Suspense fallback={<div> app loading </div>}>
      <div className={s.app}>{routes}</div>;
    </Suspense>
  ) 
};

export default App;
