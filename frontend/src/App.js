import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import SigninPage from './pages/SigninPage/SigninPage.js'
import SignupPage from './pages/SignupPage/SignupPage.js'
import InitialPage from './pages/InitialPage/InitialPage.js'
import QuestionPage from './pages/QuestionPage/QuestionPage.js'
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
        </Router>
      </AuthContext.Provider>
    </Store>
  );
}

export default App;
