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

import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  appbar: {
    backgroundColor: theme.palette.common.navbarBlack,
    color: theme.palette.common.white
  },
  optionsGroup: {
    display: 'flex',
    flexDirection: 'row',
    marginLeft: '78px'
  },
  menuOptions: {
    fontWeight: theme.typography.fontWeightRegular,
    display: 'none',
    margin: theme.spacing(1),
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
    cursor: 'pointer'
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
    fontWeight: theme.typography.fontWeightRegular,
    cursor: 'pointer'
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
  svgIcon: {
    cursor: 'pointer'
  }
}));

function NavBar() { 
    const classes = useStyles();
    const yodaGreen = '#D7E2C6';
    const { authTokens, setAuthTokens } = useAuth();
    let history = useHistory();
    
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
    function navigateToInitial(){
      history.push('/');
    }
    function navigateToBrowse(){
      history.push('/browse');
    }
    function navigateToProfile(){
      history.push('/profile');
    }
    function navigateToSubmissions(){
      history.push('/submissions');
    }

    return (
        <AppBar className={classes.appbar} position="static">
          <Toolbar>
              
              <SvgIcon className={classes.svgIcon} onClick={navigateToInitial} component={YodaLogo} style={{ fontSize: 30, verticalAlign: 'middle' }} viewBox="0 0 42 42" />
              <Typography variant="h6" className={classes.logo} onClick={navigateToInitial}>
                <span style={{marginLeft: '8px'}}>CODE</span>
                <span style={{color:`${yodaGreen}`}}> JEDI</span>
              </Typography>
              <span className={classes.optionsGroup}>
                <Typography variant="h6" className={classes.menuOptions} onClick={navigateToBrowse}>
                  BROWSE
                </Typography>
                <Typography variant="h6" className={classes.menuOptions} onClick={navigateToProfile}>
                  PROFILE
                </Typography>
                {/*
                <Typography variant="h6" className={classes.menuOptions} onClick={navigateToSubmissions}>
                  SUBMISSIONS
                </Typography>
                */}
              </span>
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