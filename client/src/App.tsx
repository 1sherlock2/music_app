import React, { Suspense, useEffect, useMemo, useState } from 'react';
import AppRoutes from './hoc/useRouter';
import s from './App.scss';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from './fragments/ErrorFallback/ErrorFallback';
import { I18nextProvider } from 'react-i18next';

import './store/i18n';
import { Loader_1 } from './loader/Loader_1';

const App: React.FC = () => {
  useEffect(() => {
    const body = document.getElementsByTagName('body')[0];
    body.classList.add(s.body);
  }, []);

  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      // onError={(error) => console.log(error)}
    >
      <Suspense
        fallback={
          <div className={s.loader}>
            <Loader_1 />
          </div>
        }
      >
        <div className={s.app}>
          <AppRoutes />
        </div>
        {/* <RouterProvider router={routes} /> */}
      </Suspense>
    </ErrorBoundary>
  );
};

export default App;
