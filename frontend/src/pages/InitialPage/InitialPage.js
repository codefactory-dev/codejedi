import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Navbar from '../../components/Navbar/Navbar.js'
import QuestionsList from '../../components/List/QuestionsList/QuestionsList.js'

const useStyles = makeStyles((theme) => ({
    
    questionPage: {
        height:'1020px',
        backgroundColor: theme.palette.common.black,
        color:'white'
    },  
    centralElements: {
        display: 'flex',
        alignItems: 'center',
        backgroundColor: theme.palette.common.black,
        flexDirection: 'column',
    },
    centralTextArea: {
        marginTop: 60,
        padding: 0,
        margin: 0,
        width: '100%',
        height: '100%',
        backgroundColor: theme.palette.common.black,
    },

}));

export default function InitialPage() { 
    const classes = useStyles();

    return (
            <div className={classes.questionPage}>
                <Navbar />
                <div className={classes.centralElements}>
                    <div className={classes.centralTextArea}>
                    <QuestionsList />
                    </div>
                </div>
                
            </div> 
    );

}

