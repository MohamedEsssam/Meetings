import React, { useState } from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import UserContext from "./context/auth";
import userApi from "./services/UserServices";
import PrivateRoute from "./routes/PrivateRoute";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";

import LoginScreen from "./views/LoginScreen";
import CommanderScreen from "./views/CommanderScreen";
import InquiriesScreen from "./views/InquiriesScreen";
import PoliceArmyScreen from "./views/PoliceArmyScreen";
import AdminScreen from "./views/AdminScreen";
import AllMeetings from "./views/AllMeetings";
import PermissionScreen from "./views/PermissionScreen";
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
            <PrivateRoute
              path="/myMeetings"
              component={PoliceArmyScreen}
              exact
            />
            <PrivateRoute path="/allMeetings" component={AllMeetings} exact />
            <PrivateRoute path="/admin" component={AdminScreen} exact />
            <PrivateRoute path="/inquires" component={InquiriesScreen} exact />
            <PrivateRoute path="/login" component={LoginScreen} exact />
            <PrivateRoute
              path="/permission"
              component={PermissionScreen}
              exact
            />

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
