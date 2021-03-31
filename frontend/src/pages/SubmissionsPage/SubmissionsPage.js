import React, { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Navbar from '../../components/Navbar/Navbar.js'
import QuestionsList from '../../components/List/QuestionsList/QuestionsList.js'
import { useAuth } from "../../Context/auth";
import { Link, Redirect } from "react-router-dom";
import { Typography } from "@material-ui/core"
import axios from 'axios'

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

export default function SubmissionsPage(props) { 
    const classes = useStyles();
    
    const [inputs, setInputs] = useState(['nums1', 'nums2', 'nums3']);

    const { authTokens, setAuthTokens } = useAuth();
    useEffect(()=>{
        if (authTokens){
            console.log("this is the user id: "+JSON.parse(authTokens).user._id);
            async function getSubmissionsList()
            {
                const fetchedQuestions = await axios.get(`/users/${JSON.parse(authTokens).user._id}/submissions`)
                //console.log("fetched questions from backend: "+JSON.stringify(fetchedQuestions))                
                setInputs(fetchedQuestions.data);    
            }
            getSubmissionsList();
        }
    },[])
    if (!authTokens || authTokens === "undefined") {
        return <Redirect to={"/login"} />;
    }
    return (
            <div className={classes.questionPage}>
                <Navbar setAuthTokens={setAuthTokens} />
                <div className={classes.centralElements}>
                    <div className={classes.centralTextArea}>
                    <QuestionsList
                        title={"Submissions"}
                        inputs={inputs}
                        setInputs={setInputs}
                    />
                    </div>
                </div>
                
            </div> 
    );

}

