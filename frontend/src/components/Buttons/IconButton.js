
import { makeStyles, useTheme } from '@material-ui/core/styles';
import styled, { css } from 'styled-components';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import theme from '../ui/Theme.js';
import React from 'react';


const useStyles = makeStyles(theme => ({
    button: {
        position: props => props.position || 'relative',
        zIndex: 0,
        minWidth: '0',
        width: props => props.width || 68,
        height: props => props.height || 68,
        margin: props => props.margin,
        top: props => props.top,
        left: props => props.left,
        msTransform: props => props.msTransform,
        transform: props => props.transform,
        padding: props => props.padding || '10px',
        border: `1.5px solid ${theme.palette.primary.main}`,
        borderRadius: props => props.borderRadius,
        fill: props => props.fill,
        stroke: props => props.stroke,
        transition: 'border 150ms ease-out',
        '&::before': {
            content: '""',
            position: 'absolute',
            zIndex: -1,
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',  
            opacity: 0,        
            backgroundColor: theme.palette.primary.main,
            borderRadius: props => props.borderRadius,
            transition: 'opacity 50ms ease-out'
        },
        '&:active': {
            border: `1.5px solid ${theme.palette.primary.main}`,
            '&::before': {              
                opacity: .6,
            }
        },
        '&:hover': {
            border: `1.5px solid rgba(0, 0, 0, 0)`,
            fill: props => props.fillHover,
            stroke: props => props.strokeHover,
            '&::before': {
                opacity: 1,
            }
        },
      },
}));

export default function IconButton(props) {
    const classes = useStyles(props);

    return (
        <Button disableRipple 
                disableFocusRipple 
                disableTouchRipple 
                variant="outlined" 
                className={classes.button} 
                onClick={props.onClick}>
            {props.icon}
        </Button>
    )

}

IconButton.propTypes = {
    onClick : PropTypes.func,
    icon: PropTypes.element,

    // css
    fill: PropTypes.string,
    stroke: PropTypes.string,
    fillHover: PropTypes.string,
    strokeHover: PropTypes.string,
    borderRadius: PropTypes.string,
};

IconButton.defaultProps = {
    onClick: undefined,
    icon: undefined,

    // css
    fill: 'none',
    stroke: `${theme.palette.primary.main}`,
    fillHover: 'none',
    strokeHover: '#fff',
    borderRadius: '5px'
}
