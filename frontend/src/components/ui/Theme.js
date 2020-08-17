import { createMuiTheme } from "@material-ui/core/styles";

const mainBlack = "#1B1C1D";
const mainGrey = "#F4F4F4";
const yodaGreen = '#D7E2C6';

export default createMuiTheme({
    logo: {
        yoda: `${yodaGreen}`
    },
    palette: {
        common: {
            black: `${mainBlack}`,
            grey: `${mainGrey}`,
        },
        primary: {
            main: `${mainBlack}`
        },
        secondary: {
            main: `${mainGrey}`
        }
    }
})