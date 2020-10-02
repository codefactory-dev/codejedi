import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Navbar from '../../components/Navbar/Navbar.js'
import CodeTable from '../../components/CodeTable/CodeTable.js'
import axios from 'axios'

export default function SigninPage() {
    const classes = useStyles();
    const [fetchedQuestions,setFetchedQuestions] = useState(false);
    useEffect(()=>{
        async function fetchQuestions() {
            if (!fetchedQuestions)
            {
                const result = await axios({
                    method: 'get',
                    url: '/questions'
                });  
                console.log("fetched questions: "+JSON.stringify(result.data));
            }
            setFetchedQuestions(false);
        }
        fetchQuestions();

    },[])
    return (
        <div className={classes.initialPage}>
            <Navbar />
            <CodeTable />
        </div>
    )

}

const useStyles = makeStyles((theme) => ({
    initialPage: {
        height: '900px',
        backgroundColor:'#1B1C1D',
        color:'white'
    }
}));