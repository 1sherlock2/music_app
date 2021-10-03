import { FunctionComponent } from 'react';
import { IAppContainer } from '../fragments/AudioPayload/AudioPayload.interface';

export interface IProtectedRouteProps {
  isAuth?: boolean;
  component: FunctionComponent<IAppContainer>;
  path: string;
}
