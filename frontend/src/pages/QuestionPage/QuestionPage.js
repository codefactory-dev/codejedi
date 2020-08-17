import React from 'react';
import './QuestionPage.scss';
import Navbar from '../../components/navbar/Navbar.js'
import SimpleTabs from '../../components/tabpanel/SimpleTabs.js'

function QuestionPage() { 
   

    return (
        <div id="question-page">
            <Navbar />
            <SimpleTabs />
        </div> 
    );

}

export default QuestionPage;