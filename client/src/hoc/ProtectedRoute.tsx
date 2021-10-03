import React, { Suspense } from 'react';
import { Redirect, Route } from 'react-router';
import { useRecoilValue } from 'recoil';
import { checkAuth, isAuthentication } from '../store/index';
import { IProtectedRouteProps } from './ProtectedRoute.interface';

const ProtectedRoute = ({
  component: Component,
  ...restProps
}: IProtectedRouteProps) => {
  const isAuth = useRecoilValue(isAuthentication);
  const checkAuthentication = useRecoilValue(checkAuth);

  return (
    <Route path={restProps.path}>
      {isAuth || checkAuthentication ? (
        <Suspense fallback={<div> loading </div>}>
          <Component />
        </Suspense>
      ) : (
        <Redirect to="/login" />
      )}
    </Route>
  );
};

export default ProtectedRoute;
