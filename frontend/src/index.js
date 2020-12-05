import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import Img from './Img';
import QuestionPage from './pages/QuestionPage/QuestionPage.js'
import QuestionPageProto from './pages/QuestionPageProto/QuestionPageProto.js'
//import InitialPage from './pages/InitialPage/InitialPage.js'
import SwipeList from './components/List/SwipeList';
import TestcasesInputList from './components/List/TestcasesInputList/TestcasesInputList';
import { ThemeProvider } from '@material-ui/styles'
import theme from './components/ui/Theme'
import masterCss from './masterCss.scss'
//import SignInSide from './pages/SignInSide/SignInSide.js'
import SigninPage from './pages/SigninPage/SigninPage.js'
import CssBaseline from '@material-ui/core/CssBaseline'
import DescriptionPage from './pages/DescriptionPage/DescriptionPage';
import InitialPage from './pages/InitialPage/InitialPage';

ReactDOM.render(
                <React.StrictMode>
                    <ThemeProvider theme={theme}>
                        <InitialPage />
                    </ThemeProvider>
                </React.StrictMode>, 
                document.getElementById('root'));