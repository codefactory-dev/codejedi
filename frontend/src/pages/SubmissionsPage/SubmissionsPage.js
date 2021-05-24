import React, { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Navbar from '../../components/Navbar/Navbar.js'
import SubmissionsList from '../../components/List/SubmissionsList/SubmissionsList.js'
import { useAuth } from "../../Context/auth";
import { Link, Redirect } from "react-router-dom";
import { Typography } from "@material-ui/core"
import api from 'services/api'
import { useHistory } from "react-router-dom";
import Swal from 'sweetalert2'

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

export default function SubmissionsPage({location}, ...props) { 
    let history = useHistory();
    const classes = useStyles();
    
    const [inputs, setInputs] = useState(['nums1', 'nums2', 'nums3']);

    const { authTokens, setAuthTokens } = useAuth();
    useEffect(()=>{
        if (authTokens){
            async function getSubmissionsList()
            {
                try {
                    const question = await api.get(`/users/${location.state.questionId}/submissions`)
                    setInputs(question.data);    
                } catch (error) {
                    Swal.fire("Error: could not get the submissions list for the question.")
                }
                
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
                    <SubmissionsList
                        title={"Submissions"}
                        inputs={inputs}
                        setInputs={setInputs}
                    />
                    </div>
                </div>
                
            </div> 
    );

}

