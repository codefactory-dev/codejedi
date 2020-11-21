import { makeStyles, useTheme } from '@material-ui/core/styles';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import React from 'react';
import SwipeProvider from '../SwipeableList/SwipeProvider';
import ListRow from  './ListRow';
import IconButton from '../Buttons/IconButton';

import {ReactComponent as EditIcon} from '../../icons/edit.svg';
import {ReactComponent as DeleteIcon} from '../../icons/delete.svg';

const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: theme.palette.common.black1,
        width: '100%',
        boxSizing: 'border-box',
        padding: '10px',
        margin: '0',
    },
    divider: {
        backgroundColor: theme.palette.common.black3
    },
      
  }));

export default function SwipeList() {
    const classes = useStyles();
    const theme = useTheme();
    const matchesSM = useMediaQuery(theme.breakpoints.down('xs'));

    const comment = {
        username: "Bessie Berry",
        userAvatarURL: "/static/images/avatar/1.jpg",
        isOwner: true,
        date: "05.18.2020",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore  et dolore magna aliqua. Ut enim ad minim veniam.",
        hasReply: true,
        isReply: false
    };

    const reply = {
        username: "Roberta Mota",
        userAvatarURL: "/static/images/avatar/1.jpg",
        isOwner: true,
        date: "10min ago",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.",
        hasReply: false,
        isReply: true
    }

    const comments = [comment, reply, comment];

    const swipeButtons = (
                <React.Fragment>
                    <IconButton padding={'0 10px'} onClick={() => console.log("oeoeoeoe")} icon={<EditIcon />} />
                    <IconButton padding={'0 10px'} onClick={() => console.log("aeaeaeae")} icon={<DeleteIcon />}/>
                </React.Fragment>
    );
    
    return (
        <List component="div" disablePadding={true} className={classes.root}>
            {comments.map((comment, idx) => (
                    <div key={`comment-${idx}-${comment.date}`}>
                        <SwipeProvider  disabled={!matchesSM}  swipeComponent={swipeButtons}>
                            <ListRow {... comment}/>  
                        </SwipeProvider>
                        {comment.hasReply ? undefined : <Divider variant="fullWidth" className={classes.divider}/>}
                    </div>
            ))}            
        </List>
    );
}