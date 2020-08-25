import React, { useState, useEffect } from 'react'
import Navbar from '../../components/Navbar/Navbar.js'
import axios from 'axios'

import './InitialPage.scss';

export default function InitialPage() {

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
        <div id="initial-page">
            <Navbar />
            Initial Page
        </div>
    )

}