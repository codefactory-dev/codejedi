import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from '@material-ui/styles';
import { StylesProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import App from './App';

import Img from './Img';
import TestingQuestionPage from './pages/TestingQuestionPage/QuestionPage.js';
import QuestionPage from './pages/QuestionPage/QuestionPage.js';
// import InitialPage from './pages/InitialPage/InitialPage.js'
import SwipeList from './components/List/SwipeList';
import TestcasesInputList from './components/List/TestcasesInputList/TestcasesInputList';
import theme from './components/Material-UI Theme/Theme';
import masterCss from './masterCss.scss';
import InitialPage from './pages/InitialPage/InitialPage';

ReactDOM.render(
	<React.StrictMode>
		<ThemeProvider theme={theme}>
			<StylesProvider injectFirst>
				<App />
			</StylesProvider>
		</ThemeProvider>
	</React.StrictMode>,
	document.getElementById('root')
);
