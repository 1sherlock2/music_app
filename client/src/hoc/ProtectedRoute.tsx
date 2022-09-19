import React, { Suspense, useEffect } from 'react';
import { Redirect, Route } from 'react-router';
import { useRecoilState, useRecoilValue } from 'recoil';
import { checkAuth, isAuthentication } from '../store/index';
import { IProtectedRouteProps } from './ProtectedRoute.interface';
import { authLocalStorage } from '../utils/localStorage';

const ProtectedRoute = ({
  component: Component,
  exact,
  ...restProps
}: IProtectedRouteProps) => {
  const isAuth = useRecoilValue(isAuthentication);
  const isCheck = useRecoilValue(checkAuth);
  const checkAuthentication = authLocalStorage.getToken() && isCheck;

  return (
    <Route path={restProps.path} exact>
      {isAuth || checkAuthentication ? <Component /> : <Redirect to="/login" />}
    </Route>
  );
};

export default ProtectedRoute;
