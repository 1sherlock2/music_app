import React from 'react';
import { Route, Switch } from 'react-router';
import Playlist from '../fragments/Playlist/Playlist';
import Auth from '../fragments/Auth/Auth';

import ProtectedRoute from './ProtectedRoute';

export const useRouter = () => {
  return (
    <Switch>
      <Route path="/login" component={Auth} />
      <ProtectedRoute path="/" component={Playlist} />
    </Switch>
  );
};
