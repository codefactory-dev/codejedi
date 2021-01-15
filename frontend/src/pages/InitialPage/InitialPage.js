import React, { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Navbar from '../../components/Navbar/Navbar.js'
import QuestionsList from '../../components/List/QuestionsList/QuestionsList.js'
import { useAuth } from "../../Context/auth";
import { Link, Redirect } from "react-router-dom";

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

export default function InitialPage(props) { 
    const classes = useStyles();
    const { authTokens, setAuthTokens } = useAuth();
    console.log("authtokens = "+authTokens);
    console.log("type of authtokens: "+typeof(authTokens));
    if (authTokens === "undefined") {
        return <Redirect to={"/login"} />;
    } else {
        console.log("auth tokens somehow are defined")
    }
    return (
            <div className={classes.questionPage}>
                <Navbar setAuthTokens={setAuthTokens} />
                <div className={classes.centralElements}>
                    <div className={classes.centralTextArea}>
                    <QuestionsList />
                    </div>
                </div>
                
            </div> 
    );

}

