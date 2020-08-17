import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import Img from './Img';
//import CodeEditor from './CodeEditor';
//import QuestionSubmitter from './QuestionSubmitter'
import QuestionPage from './QuestionPage/QuestionPage.js'
import { ThemeProvider } from '@material-ui/styles'
import theme from './components/ui/Theme.js'

ReactDOM.render(
                <React.StrictMode>
                    <ThemeProvider theme={theme}>
                        <QuestionPage />
                    </ThemeProvider>
                </React.StrictMode>, 
                document.getElementById('root'));