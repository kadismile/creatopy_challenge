import React, {useEffect, useState} from 'react'
import {BrowserRouter as Router, Link, Route, Switch} from "react-router-dom";

import {Register} from "./pages/auth/register";
import {Login} from "./pages/auth/login";
import {ResetPassword} from "./pages/auth/reset-password";
import {NotFoud} from "./components/404";
import {ForgotPassword} from "./pages/auth/forgot_password";

function UnauthenticatedApp() {
  return (
    <>
      <UnAuthenticatedRoutes />
    </>
  )
}

function UnAuthenticatedRoutes() {
  const { pathname } = window.location;
  const uri = pathname.split("/")[1];

if (uri === "reset-password-token") {
    return <ResetPasswordRoute />;
  } else {
    return (
      <Router>
        <Switch>
          <Route path='/' exact> <Login /> </Route>
          <Route path='/register' exact> <Register /> </Route>
          <Route path='/forgot-password' exact> <ForgotPassword /> </Route>
          <Route path='*' exact> <Login /> </Route>
        </Switch>
      </Router>
    );
  }
}


interface Item {
  title: string;
  id: number;
}

interface ChildComponentProps {
  items: Item[]
}

function ResetPasswordRoute () {
  const { href } = window.location;
  const token = href
    .substr(href.search("reset-password-token"))
    .split("token=")[0]
    .split("reset-password-token/")[1];

  return (
    <Router>
      <Switch>
        <Route path='/' exact> <Login /> </Route>
        <Route path="/reset-password-token"> <ResetPassword  resetPasswordToken={token}/> </Route>
        <Route path="/login"> <Login/> </Route>
        <Route path='*' exact> <NotFoud /> </Route>
      </Switch>
    </Router>
  );
}

export default UnauthenticatedApp
