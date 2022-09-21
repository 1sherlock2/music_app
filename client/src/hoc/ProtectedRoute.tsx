import React, { Suspense, useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { checkAuth, isAuthentication } from '../store/index';
import { IProtectedRouteProps } from './ProtectedRoute.interface';
import { authLocalStorage } from '../utils/localStorage';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ component: Component }: IProtectedRouteProps) => {
  const isAuth = useRecoilValue(isAuthentication);
  const isCheck = useRecoilValue(checkAuth);
  const checkAuthentication = authLocalStorage.getToken() && isCheck;

  return isAuth || checkAuthentication ? (
    <Component />
  ) : (
    <Navigate to="/login" replace />
  );
};

export default ProtectedRoute;
