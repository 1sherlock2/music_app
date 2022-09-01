import React, { FunctionComponent, ReactNode } from 'react';

export interface IProtectedRouteProps {
  isAuth?: boolean;
  component: FunctionComponent<ReactNode>;
  path: string;
}
