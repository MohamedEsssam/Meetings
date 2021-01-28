import React, { useState } from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import UserContext from "./context/auth";
import userApi from "./services/UserServices";
import PrivateRoute from "./routes/PrivateRoute";

import LoginScreen from "./views/LoginScreen";
import AdminScreen from "./views/AdminScreen";
import CommanderScreen from "./views/CommanderScreen";
import AppNavBar from "./components/NavBar/AppNavBar";

function App() {
  const [user, setUser] = useState();
  const [isReady, setIsReady] = useState(false);

  const getUserFromStorage = async () => {
    const user = await userApi.currentUser();
    if (!user) return;

    setUser(user);
  };

  if (!isReady) {
    getUserFromStorage();
    setIsReady(true);
  }

  return (
    <React.Fragment>
      <ToastContainer />
      <BrowserRouter>
        <UserContext.Provider value={{ user, setUser }}>
          {user && <AppNavBar />}
          <Switch>
            <PrivateRoute path="/" component={CommanderScreen} exact />
            <PrivateRoute path="/admin" component={AdminScreen} exact />

            <PrivateRoute path="/login" component={LoginScreen} exact />
            {/* <PrivateRoute path="/admin" component={AdminScreen} exact /> */}
            {/* <PrivateRoute path="/register" component={} /> */}
            {/* <PrivateRoute path="/register" component={Register}/> */}
            {/* <LoginRoute path="/login" component={LoginScreen} /> */}
            <Route
              path="/not-found"
              render={() => {
                return <div>not-found</div>;
              }}
            ></Route>
            <Redirect to={"/not-found"} />
          </Switch>
        </UserContext.Provider>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
