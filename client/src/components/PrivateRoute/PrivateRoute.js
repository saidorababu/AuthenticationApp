import React from 'react';
import { Route, Navigate } from 'react-router-dom';

function PrivateRoute({ component: Component, userData, ...rest }) {
  console.log(userData);
  console.log(...rest);
  return (
    <Route
      {...rest}
      render={(props) =>
        userData ? (
          <Component {...props} />
        ) : (
          <Navigate to="/" />
        )
      }
    />
  );
}

export default PrivateRoute;
