import React from 'react';
import { useRecoilValue } from 'recoil';
import { isAuthentication } from '~/store';

const AuthenticationHOC = ({ children }) => {
  const isAuth = useRecoilValue(isAuthentication);
  if (!isAuth) {
    return;
  }
};
