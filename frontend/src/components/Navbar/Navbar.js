import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import SvgIcon from '@material-ui/core/SvgIcon';
//import './Navbar.scss';
import { ReactComponent as YodaLogo } from '../../imgs/Yoda Logo.svg';

function NavBar() { 
    const classes = useStyles();
    const yodaGreen = '#D7E2C6';

    return (
        <AppBar position="static">
        <Toolbar>
            
            <Typography variant="h6" className={classes.title}>
              
            <SvgIcon component={YodaLogo} style={{ fontSize: 30, verticalAlign: 'middle' }} viewBox="0 0 42 42" />
            <span style={{marginLeft: '8px'}}>CODE</span>
            <span style={{color:`${yodaGreen}`}}> JEDI</span>
            </Typography>
            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                <MenuIcon />
            </IconButton>
            <Button color="inherit">Login</Button>
        </Toolbar>
        </AppBar>
    );

}

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1
    },
    menuButton: {
      marginRight: theme.spacing(0),
    },
    title: {
      flexGrow: 1,
    },
}));

export default NavBar;