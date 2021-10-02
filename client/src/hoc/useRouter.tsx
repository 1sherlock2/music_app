import React from 'react';
import { Redirect, Route, Switch } from 'react-router';
import Auth from '../fragments/Auth/Auth';
import App from '../App';
export const useRouter = (isAuth: boolean) => {
  if (!isAuth) {
    return (
      <Switch>
        <Route exact path="/login">
          <Auth />
        </Route>
        <Redirect to="/login" />
      </Switch>
    );
  }
  return (
  <Switch>
    <Route path="/">
      <App />
    </Route>
  </Switch>
  );
};
