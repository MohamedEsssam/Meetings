import React from "react";
import { Route, Redirect, useLocation } from "react-router-dom";
import { useAuth } from "../context/auth";

import LoginScreen from "../views/LoginScreen";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { user } = useAuth();
  const location = useLocation();

  return (
    <Route
      {...rest}
      render={() =>
        user ? (
          location.pathname.endsWith("login") ? (
            <Redirect to="/" />
          ) : (
            <Component />
          )
        ) : (
          <LoginScreen />
        )
      }
    />
  );
};

export default PrivateRoute;
