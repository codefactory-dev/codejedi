import React, {useState, useEffect } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import ParameterInputList from '../../components/List/ParameterInputList';


const useStyles = makeStyles(theme => ({
    root: {
        boxSizing: 'border-box',
        padding: '30px 10px',
        margin: '0',
        backgroundColor: theme.palette.common.black,
        
    },
    listContainer: {
        padding: '20px'
    }
}));

export default function DescriptionPage() {
    const classes = useStyles();
    const theme = useTheme();

    return (
        <div className={classes.root}>
            <div className={classes.listContainer}>
                <ParameterInputList />
            </div>
        </div>
    );

}