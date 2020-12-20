import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Navbar from '../../components/Navbar/Navbar.js'
import Swal from 'sweetalert2'
import axios from 'axios'
import DescriptionSubpage from './SubPages/DescriptionSubpage/DescriptionSubpage.js'
import SolutionSubpage from './SubPages/SolutionSubpage/SolutionSubpage.js'
import TestcasesSubpage from './SubPages/TestcasesSubpage/TestcasesSubpage.js'

const useStyles = makeStyles((theme) => ({
    
    minorSeparator: {
        width: '9%'
    },
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
    box: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        width: '60%',
        backgroundColor: theme.palette.common.black,
        marginTop: 60
    },
    centralTextArea: {
        marginTop: 60,
        padding: 0,
        margin: 0,
        width: '100%',
        height: '100%',
        backgroundColor: theme.palette.common.black,
    },
    btn: {
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        borderRadius: 3,
        border: 0,
        color: 'white',
        height: 48,
        padding: '0 30px',
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        // $disabled is a reference to the local disabled
        // rule within the same style sheet.
        // By using &, we increase the specificity.
        '&$disabled': {
          background: 'rgba(0, 0, 0, 0.12)',
          color: 'white',
          boxShadow: 'none',
        },
      },
    disabled: {},  
    answer: {
        color:'green',
    },
    grow: {
      flexGrow: 1,
      width: 50,
      backgroundColor: theme.palette.common.black,
    },
    grow2: {
        flexGrow: 1,
        width: 15,
        backgroundColor: theme.palette.common.black,
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

const pageTabs = {
    DESCRIPTION_PAGE: 0,
    SOLUTION_PAGE: 1,
    TESTCASES_PAGE: 2
}

export default function QuestionPageProto() { 
    const classes = useStyles();
    const [shouldSubmit, setShouldSubmit] = useState(false);
    const [shouldSave, setShouldSave] = useState(false);
    const [answer,setAnswer] = useState("");
    const [questionLoaded, setQuestionLoaded] = useState(false);
    const [questionDescription, setQuestionDescription] = useState('');
    const [questionSolution, setQuestionSolution] = useState('');
    const [questionTestcases, setQuestionTestcases] = useState('');
    const [questionTestcasesType, setQuestionTestcasesType] = useState();
    const [languageType, setLanguageType] = useState();
    const [solutionName, setSolutionName] = useState();
    const [activeTab, setActiveTab] = useState(pageTabs.DESCRIPTION_PAGE);


    function handleChange(){
        console.log("handling change");
    }

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
        let question = allQuestions.data.questions[0];
        let defaultQuestion = {
            solution: "",
            testcases: "",
            testcasesType: "",
            languageType: "",
            solutionName: "",
            description: ""
        }
        const chosenQuestion = question ? question : defaultQuestion;
        setQuestionSolution(chosenQuestion.solution);
        setQuestionTestcases(chosenQuestion.testcases);
        setQuestionTestcasesType(chosenQuestion.testcasesType);
        setLanguageType(chosenQuestion.languageType);
        setSolutionName(chosenQuestion.solutionName);
        setQuestionDescription(chosenQuestion.description);
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

    function renderSubpage(){

        const subPages = {
            [pageTabs.DESCRIPTION_PAGE]: 
                <DescriptionSubpage
                    setActiveTab={setActiveTab}
                    shouldSubmit={shouldSubmit} 
                    setShouldSubmit={setShouldSubmit}
                    shouldSave={shouldSave}
                    setShouldSave={setShouldSave}
                    questionDescription={questionDescription}
                    questionSolution={questionSolution}
                    questionTestcases={questionTestcases}
                    questionTestcasesType={questionTestcasesType}
                    languageType={languageType}
                    solutionName={solutionName}
                    answer={answer}
                    setAnswer={setAnswer}
                />,
            [pageTabs.SOLUTION_PAGE]: <SolutionSubpage />,
            [pageTabs.TESTCASES_PAGE]: <TestcasesSubpage />

        }
        return subPages[activeTab];
    }

    return (
            <div className={classes.questionPage}>
                <Navbar />
                
                <div className={classes.centralElements}>
                    <div className={classes.centralTextArea}>
                        {renderSubpage()}
                    </div>
                </div>
                
            </div> 
    );

}
