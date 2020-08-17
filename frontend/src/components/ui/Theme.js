import { createMuiTheme } from "@material-ui/core/styles";

const mainBlack = "#1B1C1D";
const mainGrey = "#F4F4F4";

export default createMuiTheme({
    palette: {
        common: {
            black: `${mainBlack}`,
            grey: `${mainGrey}`
        },
        primary: {
            main: `${mainBlack}`
        },
        secondary: {
            main: `${mainGrey}`
        }
    }
})