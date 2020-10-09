import { createMuiTheme } from "@material-ui/core/styles";

const mainBlack = "#1B1C1D";
const mainGrey = "#F4F4F4";
const mainWhite = "#FFFFFF";
const yodaGreen = '#D7E2C6';
const codejediGreen = '#00B5AD';

const teal = '#00B5AD';
const salmon = '#FF6565';

const black1 = '#262626';
const black2 = '#313233';
const black3 = '#3C3C3C';

const greyLight = '#F2F2F2';
const greyDark = '#8F8F8F';

export default createMuiTheme({
    // -------------------------------------------
    // palette
    // -------------------------------------------
    palette: {
        common: {
            black: `${mainBlack}`,
            grey: `${mainGrey}`,
            white: `${mainWhite}`,

            black1: `${black1}`,
            black2: `${black2}`,
            black3: `${black3}`,
            greyLight: `${greyLight}`,
            greyDark: `${greyDark}`,

            yodaGreen: `${yodaGreen}`,
            codejediGreen: `${codejediGreen}`
        },
        primary: {
            main: `${teal}`
        },
        secondary: {
            main: `${salmon}`
        }
    },

    // -------------------------------------------
    // typography
    // -------------------------------------------

    typography: {
        fontFamily: [
          'Lato', 
          'sans-serif',
          'Roboto',
          '"Helvetica Neue"',
          'Arial',
          'sans-serif',
        ].join(','),
        caption: { //DisplayHeader
          fontFamily: 'Lato',
          fontWeight: 700,
          letterSpacing: 10,
          textTransform: "none",
          fontSize: "2.5rem",
        },
        overline: { //Display2
          fontFamily: 'Lato',
          fontSize: "1rem",
          textTransform: "none",
          color: "white"
        },
        h1: {
          fontFamily: 'Lato',
          fontWeight: 700,
          fontSize: "2.5rem",
          color: mainGrey,
          lineHeight: 1.5
        },
        h2: {
          fontFamily: 'Lato',
          fontSize: "2.5rem",
          color: mainGrey
        },
        h3: {
          fontFamily: 'Lato',
          fontSize: "1.75rem",
          textTransform: "none",
          color: mainBlack,
        },
        h4: {
          fontFamily: 'Lato',
          fontSize: "0.85rem",
          fontWeight: 700,
          color: greyDark
        },
        h5: {
            fontFamily: 'Lato',
            fontWeight: 700,
            color: mainGrey,
            fontSize: "0.75rem"
        },
        body1: { //Paragraph
          fontFamily: 'Lato',
          fontSize: "1.25rem",
          fontWeight: 300,
          color: mainGrey
        },
        body2: { //Placeholder
          fontFamily: 'Lato',
          color: "red",
          fontWeight: 300,
          fontSize: "1rem"
        },
    },

    // -------------------------------------------
    // components
    // -------------------------------------------

    btnPrimaryOutline: {
        color: `${teal}`,
        borderColor: `${teal}`,
        textTransform: 'none',
        fontSize: '.9rem',
        fontWeight: '200',
    },
    btnPrimaryText: {
        color: `${teal}`,
        fontSize: '.9rem',
        textTransform: 'none',
        fontWeight: '200',
    },  
    checkbox: {
      color: mainGrey
    },
    formControlLabel: {
      color: mainGrey,
      fontWeight: 700,
      fontSize: '0.8rem'
    },
    inputTextField: {
      '& label': {
          color: greyDark,
          fontSize: '0.8rem',
          fontWeight: 700
      },
    },  
    logo: {
        color: `${yodaGreen}`
    },
    logo: {
      color: `${yodaGreen}`
    },
})