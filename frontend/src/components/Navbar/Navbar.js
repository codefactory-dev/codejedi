import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import SvgIcon from '@material-ui/core/SvgIcon';
import { useAuth } from "../../Context/auth";

import { ReactComponent as YodaLogo } from '../../imgs/Yoda Logo.svg';
import { ReactComponent as bars } from '../../imgs/bars.svg'
import placeholderAvatar from  '../../icons/user_avatar.svg'

import NotificationsIcon from '@material-ui/icons/Notifications';

import {
  Typography,
  IconButton,
  Menu,
  MenuList,
  MenuItem,
  Fade,
  Badge,
  Avatar,
  ListItemIcon,
  ListItemText,
  Divider
} from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
  appbar: {
    backgroundColor: theme.palette.common.navbarBlack,
    color: theme.palette.common.white
  },
  menuOptions: {
    flexGrow: 1,
    marginLeft: '78px',
    fontWeight: theme.typography.fontWeightRegular,
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
    fontWeight: theme.typography.fontWeightRegular
  },
  avatarName: {
    marginLeft: '10px',
    color: theme.palette.common.white,
    fontSize: 15,
    fontWeight: 600
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
  menuItem: {
    display: 'flex',
    justifyContent: 'center',
    width: 200
  },
  avatar: {
    border: `1px solid white`
  },
}));

function NavBar() { 
    const classes = useStyles();
    const yodaGreen = '#D7E2C6';
    const { authTokens, setAuthTokens } = useAuth();
    
    const [anchorElNotifications, setAnchorElNotifications] = useState(null);

    function handleLogout(){
      setAuthTokens();
    }

    function handleClickMenuNotifications(event){
      setAnchorElNotifications(event.currentTarget);
    }
    function handleCloseMenuNotifications(notificationId, notificationViewed){
      setAnchorElNotifications(null);
    }

    return (
        <AppBar className={classes.appbar} position="static">
        <Toolbar>
            
            <SvgIcon component={YodaLogo} style={{ fontSize: 30, verticalAlign: 'middle' }} viewBox="0 0 42 42" />
            <Typography variant="h6" className={classes.logo}>
              <span style={{marginLeft: '8px'}}>CODE</span>
              <span style={{color:`${yodaGreen}`}}> JEDI</span>
            </Typography>
            <Typography variant="h6" className={classes.menuOptions}>
            </Typography>
            <div className={classes.grow} />
            
            <Toolbar className={classes.sectionDesktop}>
              
            </Toolbar>
            <IconButton 
              color="secondary"
              onClick={handleClickMenuNotifications}
              >
                
              <Avatar className={classes.avatar} alt="Remy Sharp" src={placeholderAvatar}/>
              <Typography variant="body1" className={classes.avatarName}>
                roberta.cmota
              </Typography>
            </IconButton>
            {(
              <Menu
                id="fade-menu"
                anchorEl={anchorElNotifications}
                keepMounted
                disableScrollLock
                open={Boolean(anchorElNotifications)}
                onClose={() => handleCloseMenuNotifications(null)}
                TransitionComponent={Fade}
                elevation={2}
                getContentAnchorEl={null}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
              >
                {
                  <div>
                    <MenuItem
                      className={classes.menuItem}
                      key={'someKey'}
                      color="secondary"
                    >
                      <Typography variant="body" display="block" gutterBottom>
                          <button onClick={handleLogout}>Log out</button>
                      </Typography>
                      
                    </MenuItem>
                    <Divider/>                    
                  </div>
                }
              </Menu>
            )}
            
            <Toolbar className={classes.sectionMobile}>
              <SvgIcon component={bars} style={{ fontSize: 22, verticalAlign: 'middle' }} viewBox="0 0 29 29" />
            </Toolbar>
        </Toolbar>
        </AppBar>
    );

}

export default NavBar;