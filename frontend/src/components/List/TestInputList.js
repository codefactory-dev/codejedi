import React from 'react';
import PropTypes from 'prop-types';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';

import {ReactComponent as EditIcon} from '../../icons/edit.svg';

const useStyles = makeStyles(theme => ({
    root: {
        fontFamily: 'Lato',
        fontWeigth: '700',
        height: '100vh',
        boxSizing: 'border-box',
        padding: '30px 10px',
        margin: '0',
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.greyLight,
        
    },
    titleContainer: {
        display: 'flex',
        alignItems: 'center',
        padding: '15px 0'
    },
    title: {
        marginRight: '15px',
        fontSize: '28px',
    },
    tag: {
        padding: '5px 10px',
        backgroundColor: theme.palette.primary.main,
        borderRadius: '15px',
        fontSize: '14px',
        
    },
    subtitleContainer: {
        display: 'flex',
        alignItems: 'center',
        padding: '10px',
        fill: theme.palette.common.grey,
        color: theme.palette.common.grey,
    },
    divider: {
        backgroundColor: theme.palette.common.black2,
        height: '.75px',
        border: '0',
        margin: '0',
        padding: '0'
    }
  }));

export default function TestInputList() {
    const classes = useStyles();
    const theme = useTheme();
    const matchesSM = useMediaQuery(theme.breakpoints.down('xs'));


    return (
        <div className={classes.root}>
            <div className={classes.titleContainer}>
                <span className={classes.title}>Input</span>
                <a className={classes.tag}>20 max</a>
            </div>
            <hr className={classes.divider} />
            <div className={classes.subtitleContainer}>
                <EditIcon style={{'height': '20px', width: '20px'}} />
                <span>Value</span>
            </div>
            <hr className={classes.divider} />
            <p>nums</p>
            <hr className={classes.divider} />
            <button>New</button>
            <hr className={classes.divider} />
            <button>Save</button>
        </div>
    );
}