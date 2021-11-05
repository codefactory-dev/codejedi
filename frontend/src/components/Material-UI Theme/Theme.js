import { createMuiTheme } from '@material-ui/core/styles';

const teal = '#00B5AD';
const tealDark = '#005b57';
const salmon = '#FF6565';

const black1 = '#1B1C1D';
const black2 = '#313233';
const black3 = '#3C3C3C';

const grey = '#767676';
const grey2 = '#707070'; // placeholder
const grey3 = '#989898'; // disabled
const greyLight = '#F2F2F2';
const greyDark = '#8F8F8F';

const white = '#FFFFFF';

const yodaGreen = '#D7E2C6';
const codejediGreen = '#00B5AD';
const navbarBlack = '#313233';

export default createMuiTheme({
	// -------------------------------------------
	// palette
	// -------------------------------------------
	palette: {
		common: {
			white: `${white}`,
			black: `${black1}`,
			black2: `${black2}`,
			black3: `${black3}`,
			navbarBlack: `${navbarBlack}`,
			grey: `${grey}`,
			grey2: `${grey2}`,
			grey3: `${grey3}`,
			greyLight: `${greyLight}`,
			greyDark: `${greyDark}`,
			yodaGreen: `${yodaGreen}`,
			codejediGreen: `${codejediGreen}`,
		},
		primary: {
			main: `${teal}`,
		},
		secondary: {
			main: `${salmon}`,
		},
	},

	// -------------------------------------------
	// typography
	// -------------------------------------------

	typography: {
		fontFamily: [
			'Lato',
			'sans-serif',
			'Open Sans',
			'sans-serif',
			'Roboto',
			'"Helvetica Neue"',
			'Arial',
			'sans-serif',
		].join(','),
		caption: {
			// DisplayHeader
			fontFamily: 'Lato',
			fontWeight: 700,
			letterSpacing: 10,
			textTransform: 'none',
			fontSize: '2.5rem',
		},
		overline: {
			// Display2
			fontFamily: 'Lato',
			fontSize: '1rem',
			textTransform: 'none',
			color: 'white',
		},
		h1: {
			fontFamily: 'Lato',
			fontWeight: 700,
			fontSize: '2.5rem',
			color: grey,
			lineHeight: 1.5,
		},
		h2: {
			fontFamily: 'Lato',
			fontSize: '2.5rem',
			color: grey,
		},
		h3: {
			fontFamily: 'Lato',
			fontSize: '1.75rem',
			textTransform: 'none',
			color: black1,
		},
		h4: {
			fontFamily: 'Lato',
			fontSize: '0.85rem',
			fontWeight: 700,
			textAlign: 'center',
			color: greyDark,
		},
		h5: {
			fontFamily: 'Lato',
			fontWeight: 700,
			color: grey,
			fontSize: '0.75rem',
		},
		button: {
			fontFamily: 'Lato',
			fontSize: '.9rem',
			textTransform: 'none',
			fontWeight: 400,
			padding: '0px 20px 0px 20px',
			color: codejediGreen,
		},
		body1: {
			// Paragraph
			fontFamily: 'Lato',
			fontSize: '1.25rem',
			fontWeight: 300,
			color: grey,
		},
		body2: {
			// Placeholder
			fontFamily: 'Lato',
			color: 'red',
			fontWeight: 300,
			fontSize: '1rem',
		},
	},

	// -------------------------------------------
	// components
	// -------------------------------------------

	btnPrimaryOutline: {
		color: `${teal}`,
		border: `1px solid ${teal}`,
		borderRadius: `5px`,
		textTransform: 'none',
		transition: 'background 50ms linear',
		backgroundColor: `rgba(0, 0, 0, 0)`,
		'&:hover': {
			cursor: 'pointer',
			backgroundColor: `${teal}`,
			color: `${white}`,
		},
		'&:active': {
			backgroundColor: tealDark,
			border: 'none',
		},
	},
	btnPrimaryText: {
		color: `${teal}`,
		fontFamily: 'Lato',
		fontSize: '.9rem',
		textTransform: 'none',
		fontWeight: '200',
	},
	listSubtitle: {
		fontFamily: 'Lato',
		fontSize: '.9rem',
		fontWeight: '700',
		padding: '0',
		margin: '0',
		color: `${grey3}`,
	},
	divider: {
		backgroundColor: `${black2}`,
		height: '.75px',
		border: '0',
		margin: '0',
		padding: '0',
	},
	checkbox: {
		color: greyLight,
	},
	formControlLabel: {
		color: greyLight,
		fontWeight: 700,
		fontSize: '0.8rem',
	},
	inputTextField: {
		caretColor: greyLight,
		'& div': {
			'&::before': {
				borderBottom: 'none',
			},
			'& input': {
				color: greyLight,
				borderBottom: `2px solid ${greyDark}`,
			},
		},
		'& label': {
			color: greyDark,
			fontSize: '0.8rem',
			fontWeight: 700,
		},
	},
	adornedFormTextfield: {
		caretColor: greyLight,
		color: greyLight,
		// borderBottom: `2px solid ${greyDark}`,
		'& input': {
			color: greyLight,
		},
		'& label': {
			color: greyDark,
			fontSize: '0.8rem',
			fontWeight: 700,
		},
		'& div': {
			'& input': {
				// borderBottom: '1px solid rgba(255, 0, 0, 0.42)',
			},
			'&::before': {
				borderBottom: `2px solid ${greyDark}`,
			},
			'& button': {
				color: greyDark,
			},
		},
	},
	logo: {
		color: `${yodaGreen}`,
	},
});
