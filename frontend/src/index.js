import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import Img from './Img';
import QuestionPage from './pages/QuestionPage/QuestionPage.js'
//import InitialPage from './pages/InitialPage/InitialPage.js'
import SwipeList from './components/List/SwipeList';
import { ThemeProvider } from '@material-ui/styles'
import theme from './components/Ui/Theme.js'
//import SignInSide from './pages/SignInSide/SignInSide.js'
import SigninPage from './pages/SigninPage/SigninPage.js'
import CssBaseline from '@material-ui/core/CssBaseline'

ReactDOM.render(
                <React.StrictMode>
                    <ThemeProvider theme={theme}>
                        <SwipeList />
                    </ThemeProvider>
                </React.StrictMode>, 
                document.getElementById('root'));