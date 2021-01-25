import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <React.Fragment>
      <ToastContainer />
      <BrowserRouter>
        <Switch></Switch>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
