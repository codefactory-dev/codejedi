import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import Img from './Img';
import QuestionPage from './pages/QuestionPage/QuestionPage.js'
import QuestionPageProto from './pages/QuestionPageProto/QuestionPageProto.js'
//import InitialPage from './pages/InitialPage/InitialPage.js'
import SwipeList from './components/List/SwipeList';
import TestInputList from './components/List/TestInputList';
import { ThemeProvider } from '@material-ui/styles'
import theme from './components/ui/Theme'
import masterCss from './masterCss.scss'
//import SignInSide from './pages/SignInSide/SignInSide.js'
import SigninPage from './pages/SigninPage/SigninPage.js'
import CssBaseline from '@material-ui/core/CssBaseline'
import CustomSelect from './components/Select/CustomSelect.js'

ReactDOM.render(
                <React.StrictMode>
                        <CustomSelect />
                </React.StrictMode>, 
                document.getElementById('root'));