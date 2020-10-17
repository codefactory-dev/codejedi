import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Navbar from '../../components/Navbar/Navbar.js'
import SimpleTabs from '../../components/Tabpanel/SimpleTabs.js'
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Swal from 'sweetalert2'
import questionTypes from '../../utils/questionTypes.js';
import axios from 'axios'

export default function QuestionPage() { 
    const classes = useStyles();
    const [shouldSubmit, setShouldSubmit] = useState(false);
    const [shouldSave, setShouldSave] = useState(false);
    const [answer,setAnswer] = useState("");
    const [questionLoaded, setQuestionLoaded] = useState(false);
    const [questionDescription, setQuestionDescription] = useState('');
    const [questionSolution, setQuestionSolution] = useState('');
    const [questionTestcases, setQuestionTestcases] = useState('');
    const [questionTestcasesType, setQuestionTestcasesType] = useState();



    async function loadQuestion(){
        const allUsers = await axios({
            method: 'get',
            url: `/users`
        });  
        const userId = allUsers.data[0]._id;
        const allQuestions = await axios({
            method: 'get',
            url: `/users/${userId}/questions`,
        });  
        setQuestionSolution(allQuestions.data.questions[0].solution);
        setQuestionTestcases(allQuestions.data.questions[0].testcases);
        setQuestionTestcasesType(allQuestions.data.questions[0].testcasesType);
        setQuestionDescription(allQuestions.data.questions[0].description);
    }

    function triggerSubmitAll(){
        setShouldSubmit(true);
    }

    function triggerLoad(){
        async function performQuestionLoading(){
            await loadQuestion();
            setQuestionLoaded(true);
        }
        performQuestionLoading();
        console.log("finished loading questions");
    }

    function triggerSave(){
        console.log("triggered save");
        setShouldSave(true);
    }
    useEffect(()=>{
        if(answer.length > 0)
        {
            Swal.fire(answer);
        }
        setAnswer("");
    },[answer])

    return (
        <div className={classes.questionPage}>
            <Navbar />
            <Container maxWidth="sm">
                <SimpleTabs 
                    shouldSubmit={shouldSubmit} 
                    setShouldSubmit={setShouldSubmit}
                    shouldSave={shouldSave}
                    setShouldSave={setShouldSave}
                    questionDescription={questionDescription}
                    questionSolution={questionSolution}
                    questionTestcases={questionTestcases}
                    questionTestcasesType={questionTestcasesType}
                    answer={answer}
                    setAnswer={setAnswer}
                    />
                <Box>
                    <div className={classes.grow} />
                    <Button 
                        className={classes.submitBtn} 
                        variant="contained" 
                        color="primary"
                        onClick={triggerSubmitAll}
                    >
                        Submit Question
                    </Button>
                    <Button 
                        className={classes.saveBtn} 
                        variant="contained" 
                        color="primary"
                        onClick={triggerSave}
                    >
                        Save
                    </Button>
                    <Button 
                        className={classes.loadBtn} 
                        variant="contained" 
                        color="primary"
                        onClick={triggerLoad}
                    >
                        Load
                    </Button>
                </Box>
            </Container>
            
        </div> 
    );

}

const useStyles = makeStyles((theme) => ({
    questionPage: {
        height:'900px',
        backgroundColor:'#1B1C1D',
        color:'white'
    },    
    answer: {
        color:'green',
    },
    grow: {
      flexGrow: 1,
    },
    submitBtn: {
      marginTop: '20px',
      float: 'right',
      textTransform: 'none',
      fontWeight: theme.typography.fontWeightRegular,
    },
    saveBtn: {
        marginTop: '20px',
        marginRight: '20px',
        float: 'right',
        textTransform: 'none',
        fontWeight: theme.typography.fontWeightRegular,
    },
    loadBtn: {
        marginTop: '20px',
        marginRight: '20px',
        float: 'right',
        textTransform: 'none',
        fontWeight: theme.typography.fontWeightRegular,
    },

}));