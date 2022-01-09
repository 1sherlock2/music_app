import React, { Suspense, useEffect } from 'react';
import { Redirect, Route } from 'react-router';
import { useRecoilState, useRecoilValue } from 'recoil';
import { checkAuth, isAuthentication } from '../store/index';
import { IProtectedRouteProps } from './ProtectedRoute.interface';
import { authLocalStorage } from '../utils/localStorage';

const ProtectedRoute = ({
  component: Component,
  ...restProps
}: IProtectedRouteProps) => {
  const isAuth = useRecoilValue(isAuthentication);
  const checkAuthentication =
    authLocalStorage.getToken() && useRecoilValue(checkAuth);

  return (
    <Route path={restProps.path}>
      {isAuth || checkAuthentication ? <Component /> : <Redirect to="/login" />}
    </Route>
  );
};

export default ProtectedRoute;
