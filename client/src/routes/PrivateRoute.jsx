import React from "react";
import { Route, Redirect, useLocation } from "react-router-dom";
import { useAuth } from "../context/auth";
import { currentUser } from "../services/UserServices";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const user = useAuth();
  const location = useLocation();

  console.log("====================================");
  console.log(location.pathname);
  console.log("====================================");
  console.log(user);
  console.log("====================================");
  console.log("====================================");
  console.log("====================================");
  console.log(
    user ? (
      location.pathname.includes("/login") ? (
        <Redirect to="/" />
      ) : (
        <Component />
      )
    ) : (
      <Redirect to="/login" />
    )
  );
  console.log("====================================");

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
          <Redirect to="/login" />
        )
      }
    />
  );
};

export default PrivateRoute;
