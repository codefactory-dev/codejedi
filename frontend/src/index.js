import React from 'react';
import ReactDOM from 'react-dom';
//import QuestionPage from './pages/QuestionPage/QuestionPage.js'
import SigninPage from './pages/SigninPage/SigninPage.js'
//import SignInSide from './pages/SignInSide/SignInSide.js'
import { ThemeProvider } from '@material-ui/styles'
import theme from './components/Ui/Theme.js'
import CssBaseline from '@material-ui/core/CssBaseline'
//<SignInSide />
//<SigninPage>
ReactDOM.render(
                <React.StrictMode>
                    <CssBaseline />
                    <ThemeProvider theme={theme}>
                        <SigninPage />
                    </ThemeProvider>
                </React.StrictMode>, 
                document.getElementById('root'));