import React from 'react';
import ReactDOM from 'react-dom';
//import QuestionPage from './pages/QuestionPage/QuestionPage.js'
import SigninPage from './pages/SigninPage/SigninPage.js'
import { ThemeProvider } from '@material-ui/styles'
import theme from './components/Ui/Theme.js'
import CssBaseline from '@material-ui/core/CssBaseline'

ReactDOM.render(
                <React.StrictMode>
                    <CssBaseline />
                    <ThemeProvider theme={theme}>
                        <SigninPage />
                    </ThemeProvider>
                </React.StrictMode>, 
                document.getElementById('root'));