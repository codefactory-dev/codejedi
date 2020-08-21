import React from 'react';
import './QuestionPage.scss';
import Navbar from '../../components/navbar/Navbar.js'
import SimpleTabs from '../../components/tabpanel/SimpleTabs.js'
import Container from '@material-ui/core/Container';

function QuestionPage() { 
   

    return (
        <div id="question-page">
            <Navbar />
            <Container maxWidth="sm">
                <SimpleTabs />
            </Container>
        </div> 
    );

}

export default QuestionPage;