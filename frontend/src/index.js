import React from 'react';
import ReactDOM from 'react-dom';
import { create } from 'jss';
import rtl from 'jss-rtl';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { StylesProvider, jssPreset } from '@mui/styles';
import App from './App';
import theme from './components/Material-UI Theme/Theme';

// Configure JSS
const jss = create({
	plugins: [...jssPreset().plugins, rtl()],
});

ReactDOM.render(
	<React.StrictMode>
		<ThemeProvider theme={theme}>
			<StylesProvider jss={jss}>
				<App />
			</StylesProvider>
		</ThemeProvider>
	</React.StrictMode>,
	document.getElementById('root')
);
