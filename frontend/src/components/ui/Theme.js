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
    logo: {
        yoda: `${yodaGreen}`
    },
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
    }
})