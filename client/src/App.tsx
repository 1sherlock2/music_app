import React, { Suspense, useEffect, useMemo, useState } from 'react';
import { useRouter } from './hoc/useRouter';
import s from './App.scss';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from './fragments/ErrorFallback/ErrorFallback';

const App: React.FC = () => {
  const routes = useRouter();

  useEffect(() => {
    const body = document.getElementsByTagName('body')[0];
    body.classList.add(s.app);
  }, []);

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Suspense fallback={<div> app loading </div>}>
        <div className={s.app}>{routes}</div>
      </Suspense>
    </ErrorBoundary>
  );
};

export default App;
