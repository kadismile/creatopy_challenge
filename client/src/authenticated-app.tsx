import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import {Home} from './pages/home'
import {NotFoud} from './components/404'
import {Header} from "./components/header";
import {SideBar} from "./components/sidebar";
import React from "react";
import {Register} from "./pages/auth/register";




function AuthenticatedApp() {
  return (
   <div id="layout-wrapper">

     <Router>
       <Header />
       <SideBar />
       <Switch>
         <Route path='/' exact> <Home /> </Route>
         <Route path='/register' exact> <Register /> </Route>
         <Route path='*' exact> <NotFoud /> </Route>
       </Switch>
     </Router>
     <footer className="footer">
       <div className="container-fluid">
         <div className="row">
           <div className="col-sm-6">
           
           </div>
           <div className="col-sm-6">
             <div className="text-sm-right d-none d-sm-block">
               {new Date().getFullYear()} © kadismile.
             </div>
           </div>
         </div>
       </div>
     </footer>
    </div>
  )
}


export default AuthenticatedApp
