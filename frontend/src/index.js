import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import Img from './Img';
import QuestionPage from './pages/QuestionPage/QuestionPage.js'
//import SigninPage from './pages/SigninPage/SigninPage.js'
import { ThemeProvider } from '@material-ui/styles'
import theme from './components/Ui/Theme.js'

ReactDOM.render(
                <React.StrictMode>
                    <ThemeProvider theme={theme}>
                        <QuestionPage />
                    </ThemeProvider>
                </React.StrictMode>, 
                document.getElementById('root'));