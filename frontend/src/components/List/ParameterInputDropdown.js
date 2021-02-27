import React, {useState} from 'react';
import PropTypes from 'prop-types';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';

import {ReactComponent as DotsIcon} from '../../icons/dots.svg';

const useStyles = makeStyles(theme => ({
    root: {
        position: 'absolute',        
        top: '0',
        zIndex: 1,
        backgroundColor: theme.palette.common.black, 
        width: '100%',
        borderRadius: '5px',
        border: `1px solid #141414`,
        boxShadow: `0px 0px 25px #141414`,
        margin: '2px 0',  
        padding: '0px 5px',
        boxSizing: 'border-box',
        
    },
    header: {
        ...theme.listSubtitle,
        fontSize: '.7em',
        padding: '15px 3px',
    },
    input: {
        display: 'flex',
        alignItems: 'center',
        margin: '5px 0',
        padding: '3px',
        borderRadius: '3px',
        '&:hover': {
            cursor: 'pointer',
            backgroundColor: theme.palette.common.black2,
        }
    },
    inputTypeTag: {
        alignSelf: 'flex-start',
        border: `1px solid ${theme.palette.primary.main}`,
        borderRadius: '10%',
        padding: '5px',
        marginLeft: '10px',
        fontSize: '.7rem',
        fontFamily: 'Lato',
        fontWeight: '400',
        color: theme.palette.primary.main,
    },
    divider: {
        ...theme.divider
    },
    icon: {
        height: '12px', 
        width: '12px', 
        fill: theme.palette.common.black3
    }
  }));

export default function ParameterInputDropdown(props) {
    const classes = useStyles();
    const theme = useTheme();

    return (
        <div className={classes.root}>
            <p className={classes.header}>Select an option</p>
            <hr className={classes.divider} />
            {props.options.map((option, idx) => {
                return (
                    <div className={classes.input} onClick={() => props.onClick(idx)}>
                        <DotsIcon className={classes.icon} />
                        <a className={classes.inputTypeTag}>{option}</a>
                    </div>
                )
            })}
        </div>       
    );
}

ParameterInputDropdown.propTypes = {
	options: PropTypes.array.isRequired,
}