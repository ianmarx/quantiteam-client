import React from 'react';
import { Redirect, Route } from 'react-router-dom';

const PrivateRoute = ({ component: Component, isAuthenticated, ...rest }) => (
  <Route
    {...rest}
    render={props => (
      isAuthenticated
      ? (
        <Component {...props} />
      )
      : (<Redirect to={{ pathname: '/signin', state: { from: props.location } }} />)
    )}
  />
);

export default PrivateRoute;
