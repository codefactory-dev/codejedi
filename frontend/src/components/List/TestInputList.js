import React from 'react';
import PropTypes from 'prop-types';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';

import {ReactComponent as HashIcon} from '../../icons/hashtag.svg';
import {ReactComponent as AddIcon} from '../../icons/add.svg';

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
        fontSize: '1.4rem',
    },
    tag: {
        padding: '5px 10px',
        backgroundColor: theme.palette.primary.main,
        borderRadius: '15px',
        fontSize: '.65rem',
        fontWeight: 700,
        
    },
    subtitleContainer: {
        display: 'flex',
        alignItems: 'center',
        marginLeft: '5px',
        padding: '10px',
        fill: theme.palette.common.grey3,
        

        '& p': {
            ... theme.listSubtitle,
            marginLeft: '5px'
        }
    },
    contentContainer: {
        
    },
    input: {
        color: theme.palette.common.white,
        fontSize: '1rem',
        marginLeft: '30px',
        margin: '10px 0',
        padding: '0'
    },
    divider: {
        ...theme.divider
    },
    addContainer: {
        display: 'inline-flex',
        alignItems: 'center', 
        marginLeft: '25px',
        fill: theme.palette.common.grey3,
        padding: '5px',
        borderRadius: '5px',
        margin: '5px 0',
        '&:hover': {
            cursor: 'pointer',
            backgroundColor: theme.palette.common.black2,
        },
    },
    newButton: {
        ...theme.listSubtitle,
        marginLeft: '5px',   
    },
    saveButton: {
        ... theme.btnPrimaryOutline,
        margin: '40px 0',
    }
  }));

export default function TestInputList() {
    const classes = useStyles();
    const theme = useTheme();
    const inputs = ['nums1', 'nums2', 'nums3'];

    const onClickHandler = (e) => {
        console.log("oeoeoeoeoe");
    }

    

    return (
        <div className={classes.root}>
            <div className={classes.titleContainer}>
                <span className={classes.title}>Input</span>
                <a className={classes.tag}>20 max</a>
            </div>
            <hr className={classes.divider} />
            <div className={classes.subtitleContainer}>
                <HashIcon style={{'height': '12px', width: '12px'}} />
                <p>Value</p>
            </div>
            <hr className={classes.divider} />
            <div className={classes.contentContainer}>
                {inputs.map((input, idx) => {
                    return (
                    <React.Fragment key={`input-${idx}`}>
                        <p className={classes.input}>{input}</p>
                        <hr className={classes.divider} />
                    </React.Fragment>
                )})}
                
                <div className={classes.addContainer}>
                    <AddIcon style={{'height': '12px', width: '12px'}} />
                    <a onClick={onClickHandler} className={classes.newButton}>New</a>
                </div>
            </div>
            <hr className={classes.divider} />
            <Button variant="outlined" disableFocusRipple disableRipple className={classes.saveButton}>Save</Button>
        </div>
    );
}