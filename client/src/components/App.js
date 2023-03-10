import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { hot } from "react-hot-loader/root";

import getCurrentUser from "../services/getCurrentUser";
import "../assets/scss/main.scss";
import RegistrationForm from "./registration/RegistrationForm";
import SignInForm from "./authentication/SignInForm";
import TopBar from "./layout/TopBar";
import ShoesListPage from "./ShoesListPage.js"
import UserShowPage from "./UserShowPage.js"
import NewShoeForm from "./NewShoeForm.js";
import ShoeShowPage from "./ShoeShowPage.js";

const App = (props) => {
  const [currentUser, setCurrentUser] = useState(undefined);
  const fetchCurrentUser = async () => {
    try {
      const user = await getCurrentUser()
      setCurrentUser(user)
    } catch(err) {
      setCurrentUser(null)
    }
  }

  useEffect(() => {
    fetchCurrentUser()
  }, [])

  return (
    <Router>
      <TopBar user={currentUser} />
      <Switch>
        <Route exact path="/" component={ShoesListPage} />
        <Route exact path="/shoes" component={ShoesListPage} />
        <Route exact path="/shoes/new" component={NewShoeForm} />
        <Route 
          exact 
          path="/shoes/:id"
          render= {(props) => <ShoeShowPage {...props} user={currentUser}/>}
        />
        <Route exact path="/users/new" component={RegistrationForm} />
        <Route exact path="/user-sessions/new" component={SignInForm} />
        <Route 
          exact 
          path="/users/:id" 
          render= {(props) => <UserShowPage {...props} currentUser={currentUser} />} 
        />
      </Switch>
    </Router>
  );
};

export default hot(App);