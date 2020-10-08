import { createMuiTheme } from "@material-ui/core/styles";

const mainBlack = "#1B1C1D";
const mainGrey = "#F4F4F4";
const yodaGreen = '#D7E2C6';

const teal = '#00B5AD';
const salmon = '#FF6565';

const black1 = '#262626';
const black2 = '#313233';
const black3 = '#3C3C3C';

const greyLight = '#F2F2F2';

export default createMuiTheme({
    // -------------------------------------------
    // palette
    // -------------------------------------------
    palette: {
        common: {
            black: `${mainBlack}`,
            grey: `${mainGrey}`,

            black1: `${black1}`,
            black2: `${black2}`,
            black3: `${black3}`,
            greyLight: `${greyLight}`
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
        DisplayHeader: {
          fontFamily: "Lato",
          textTransform: "none",
          fontSize: "66px",
          color: "red",
          fontSize: "1rem"
        },
        Display2: {
          fontFamily: "Lato",
          fontSize: "1rem",
          textTransform: "none",
          color: "white"
        },
        h1: {
          fontFamily: "Lato",
          fontWeight: 700,
          fontSize: "2.5rem",
          color: mainGrey,
          lineHeight: 1.5
        },
        h2: {
          fontFamily: "Lato",
          fontSize: "2.5rem",
          color: mainGrey
        },
        h3: {
          fontFamily: "Lato",
          fontSize: "1.75rem",
          color: mainBlack,
          fontWeight: 700
        },
        h4: {
          fontFamily: "Lato",
          color: greyLight
        },
        h5: {
            fontWeight: 500,
            fontFamily: "Lato",
            color: mainBlack
        },
        Paragraph: {
          fontSize: "1.25rem",
          fontWeight: 300,
          color: mainGrey
        },
        Placeholder: {
          color: "white",
          fontWeight: 300,
          fontSize: "1.25rem"
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
    logo: {
        yoda: `${yodaGreen}`
    },
})