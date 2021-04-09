import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import SigninPage from './pages/SigninPage/SigninPage.js'
import SignupPage from './pages/SignupPage/SignupPage.js'
import InitialPage from './pages/InitialPage/InitialPage.js'
import SubmissionsPage from './pages/SubmissionsPage/SubmissionsPage.js'
import ProfilePage from './pages/ProfilePage/ProfilePage.js'
import BrowsePage from './pages/BrowsePage/BrowsePage.js'
import QuestionPage from './pages/QuestionPage/QuestionPage.js'
import QuestionCreationPage from './pages/QuestionCreationPage/QuestionCreationPage.js'
import { AuthContext } from "./Context/auth";
import PrivateRoute from './_RouteWrappers/private'
import Store from "./store";


function App() {
  
  const tokens = localStorage.getItem("tokens");
  const [authTokens, setAuthTokens] = useState(tokens);

  const setTokens = (data) => {
    localStorage.setItem("tokens", JSON.stringify(data));
    setAuthTokens(JSON.stringify(data));
  }

  return (
    <Store>
      <AuthContext.Provider value={{ authTokens, setAuthTokens: setTokens }}>
        <Router>
            <Route exact path="/" component={InitialPage} />
            <Route path="/login" component={SigninPage} />
            <Route path="/signup" component={SignupPage} />
            <PrivateRoute path="/question" component={QuestionPage} />
            <PrivateRoute path="/questionCreation" component={QuestionCreationPage} />
            <PrivateRoute path="/submissions" component={SubmissionsPage} />
            <PrivateRoute path="/browse" component={BrowsePage} />
            <PrivateRoute path="/profile" component={ProfilePage} />
        </Router>
      </AuthContext.Provider>
    </Store>
  );
}

export default App;
