import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import SigninPage from './pages/SigninPage/SigninPage.js'
import InitialPage from './pages/InitialPage/InitialPage.js'
import { AuthContext } from "./Context/auth";
import PrivateRoute from './_RouteWrappers/private'


function App() {
  
  const tokens = localStorage.getItem("tokens");
  const [authTokens, setAuthTokens] = useState(tokens);

  const setTokens = (data) => {
    localStorage.setItem("tokens", JSON.stringify(data));
    setAuthTokens(data);
  }

  return (
    <AuthContext.Provider value={{ authTokens, setAuthTokens: setTokens }}>
      <Router>
          <Route exact path="/" component={InitialPage} />
          <Route path="/login" component={SigninPage} />
          {/*<PrivateRoute path="/admin" component={Admin} />*/}
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
