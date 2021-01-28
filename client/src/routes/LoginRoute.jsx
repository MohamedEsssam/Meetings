import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "../context/auth";

const LoginRoute = ({ component: Component, ...rest }) => {
  const { user } = useAuth();

  return (
    <Route
      {...rest}
      render={() => (user ? <Redirect to="/" /> : <Component />)}
    />
  );
};

export default LoginRoute;
