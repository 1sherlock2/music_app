import React, { Suspense, useEffect, useMemo, useState } from 'react';
import AppRoutes from './hoc/useRouter';
import s from './App.scss';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from './fragments/ErrorFallback/ErrorFallback';

const App: React.FC = () => {
  useEffect(() => {
    const body = document.getElementsByTagName('body')[0];
    body.classList.add(s.app);
  }, []);

  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      // onError={(error) => console.log(error)}
    >
      <Suspense fallback={<div> app loading </div>}>
        <div className={s.app}>
          <AppRoutes />
          {/* <RouterProvider router={routes} /> */}
        </div>
      </Suspense>
    </ErrorBoundary>
  );
};

export default App;
