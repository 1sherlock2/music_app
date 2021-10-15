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
  const checkAuthentication = !isAuth && !!useRecoilValue(checkAuth);
  return (
    <Route path={restProps.path}>
      {isAuth || checkAuthentication ? <Component /> : <Redirect to="/login" />}
    </Route>
  );
};

export default ProtectedRoute;
