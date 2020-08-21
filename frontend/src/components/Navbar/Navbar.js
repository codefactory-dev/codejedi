import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import Box from '@material-ui/core/Box';
import SvgIcon from '@material-ui/core/SvgIcon';
import Avatar from '@material-ui/core/Avatar';
import Icon from '@material-ui/core/Icon';
//import './Navbar.scss';
import { ReactComponent as YodaLogo } from '../../imgs/Yoda Logo.svg';
import placeholderAvatar from '../../imgs/profile pic.png'

function NavBar() { 
    const classes = useStyles();
    const yodaGreen = '#D7E2C6';

    return (
        <AppBar position="static">
        <Toolbar>
            
            <SvgIcon component={YodaLogo} style={{ fontSize: 30, verticalAlign: 'middle' }} viewBox="0 0 42 42" />
            <Typography variant="h6" className={classes.logo}>
              <span style={{marginLeft: '8px'}}>CODE</span>
              <span style={{color:`${yodaGreen}`}}> JEDI</span>
            </Typography>
            <Typography variant="h6" className={classes.menuOptions}>
              <span>BROWSE</span>
              <span style={{marginLeft: '54px'}}>PROFILE</span>
            </Typography>
            <div className={classes.grow} />
            <Toolbar className={classes.sectionDesktop}>
              <Avatar alt="Remy Sharp" src={placeholderAvatar} />
              <Typography variant="body1" className={classes.avatarName}>
                roberta.cmota
              </Typography>
            </Toolbar>
            <Toolbar className={classes.sectionMobile}>
              <Icon className="fa fa-plus-circle" />
            </Toolbar>
        </Toolbar>
        </AppBar>
    );

}

const useStyles = makeStyles((theme) => ({
    menuOptions: {
      flexGrow: 1,
      marginLeft: '78px',
      fontWeight: theme.typography.fontWeightLight,
      display: 'none',
      [theme.breakpoints.up('md')]: {
        display: 'flex',
      },
    },
    grow: {
      flexGrow: 1,
    },
    root: {
      flexGrow: 1
    },
    menuButton: {
      marginRight: theme.spacing(0),
    },
    logo: {
      flexShrink: 1,
      fontWeight: theme.typography.fontWeightLight
    },
    avatarName: {
      marginLeft: '10px'
    },
    sectionDesktop: {
      display: 'none',
      [theme.breakpoints.up('md')]: {
        display: 'flex',
      },
    },
    sectionMobile: {
      display: 'flex',
      [theme.breakpoints.up('md')]: {
        display: 'none',
      },
    },

}));

export default NavBar;