import { makeStyles, useTheme } from '@material-ui/core/styles';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import React from 'react';


const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',      
      backgroundColor: theme.palette.common.black1
    },
    row: {
        '&:hover': {
            backgroundColor: theme.palette.common.black3
        }
    },
    headerContainer: {
        display: 'flex'
    },
    avatar: {
        border: `1.5px solid ${theme.palette.common.greyLight}`
    },
    header: {
        display: 'flex',
        color: theme.palette.common.greyLight,
        fontSize: '.75rem',
        fontWeight: 'bold',
        width: '100%',
        [theme.breakpoints.down('xs')]: {
            margin: '0 10px',           
        }
    },
    date: {
        ... theme.typography.body2,
        marginLeft: 'auto',
        fontSize: '.75rem',
        fontWeight: 'bold',
        lineHeight: '1.5'
    },
    text: {
        color: theme.palette.common.greyLight,
        fontSize: '.9rem',
        marginTop: '10px',
    },
    readButton: {
        ... theme.btnPrimaryText,
        display: 'block',
        margin: 'auto',
        marginTop: '20px',

    },
    replyButton: {
        ... theme.btnPrimaryOutline,
        position: 'absolute',
        bottom: '15px',     
        right: '15px',
        
    },
    nested: {
        paddingLeft: 0,
        paddingRight: 0
    },
  }));

const maxTextLength = 100;

export default function ListRow() {
    const classes = useStyles();
    const theme = useTheme();
    const matchesSM = useMediaQuery(theme.breakpoints.down('xs'));

    const username = "Bessie Berry";
    const date = "05.18.2020";
    const text = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore  et dolore magna aliqua. Ut enim ad minim veniam.";
    const owner = "Roberta Mota";
    const reply = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam."
    const replyDate = "10min ago";
    const isOwner = true;

    const avatar = <Avatar className={classes.avatar} alt="user avatar" src="/static/images/avatar/1.jpg" /> ;
    const header = (<div className={classes.header}>
                        <div>{username}</div>
                        <div className={classes.date}>{date}</div>
                    </div>            
    );

    return (
        <List className={classes.root}>
            <ListItem className={classes.row} alignItems="flex-start">
                {matchesSM ? undefined:
                    <ListItemAvatar>
                        {avatar}
                    </ListItemAvatar>
                }
                
                <ListItemText
                    primary= {  
                            <div className={classes.headerContainer}>
                                {matchesSM 
                                    ? avatar
                                    : undefined
                                }
                                {header}
                            </div>                                 
                    }
                    secondary={
                        <React.Fragment>                
                            <div className={classes.text}>
                                {text.length > maxTextLength ? text.substring(0, maxTextLength) + '[...]' : text}
                            </div>

                            <Button className={classes.readButton} variant={text.length > maxTextLength ? undefined : 'disabled'} disableElevation>
                                Read more
                            </Button>

                            {reply 
                                ?
                                <List component="div" disablePadding>
                                    <ListItem className={classes.nested} alignItems="flex-start">
                                        {matchesSM 
                                            ? 
                                            undefined
                                            :
                                            <ListItemAvatar>
                                                {avatar}
                                            </ListItemAvatar>
                                        }
                                        <ListItemText 
                                            primary= {  
                                                <div className={classes.headerContainer}>
                                                    {matchesSM 
                                                        ? avatar
                                                        : undefined
                                                    }
                                                    {header}
                                                </div>                                 
                                            }
                                            secondary={
                                                <React.Fragment>                
                                                    <div className={classes.text}>
                                                        {text.length > maxTextLength ? text.substring(0, maxTextLength) + '[...]' : text}
                                                    </div>

                                                    <Button className={classes.readButton} variant={text.length > maxTextLength ? undefined : 'disabled'} disableElevation>
                                                        Read more
                                                    </Button>
                                                </React.Fragment>
                                            }>
                                        </ListItemText>
                                    </ListItem>
                                </List>
                                :
                                isOwner && !reply 
                                    ?
                                    <Button className={classes.replyButton} disableElevation variant='outlined'>
                                            Reply
                                    </Button>
                                    :
                                    undefined
                                
                            }                  
                        </React.Fragment>        
                    }
                />
            </ListItem>
            <Divider variant="inset"/>
        </List>
    );
}