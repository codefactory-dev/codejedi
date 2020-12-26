import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Navbar from '../../components/Navbar/Navbar.js'
import Swal from 'sweetalert2'
import axios from 'axios'
import DescriptionSubpage from './SubPages/DescriptionSubpage/DescriptionSubpage.js'
import SolutionSubpage from './SubPages/SolutionSubpage/SolutionSubpage.js'
import TestcasesSubpage from './SubPages/TestcasesSubpage/TestcasesSubpage.js'
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Paper from '@material-ui/core/Paper';
import RegularButton from '../../components/Buttons/RegularButton.js'

const useStyles = makeStyles((theme) => ({
    
    regularButton: {
        width: '60%',
    },
    footer: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        height: 200,
        margin: 0,
        alignItems: 'center',
        backgroundColor: theme.palette.common.black
    },
    tabs: {
        position: 'absolute',
        width: '11%',
        minWidth: 140,
        backgroundColor: theme.palette.common.black
    },
    tab: {
        color: theme.palette.common.grey,
        fontSize: 16,
        '&$selected': {
            color: theme.palette.common.white,
            backgroundColor: theme.palette.common.black3
        },
        '&$scroller': {
            position: 'none'
        },
    },
    selected: {},
    scroller: {},
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
        }
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
    horizontalContainer: {
        display: 'flex',
        alignItems: 'center'
    }

}));

const pageTabs = {
    DESCRIPTION_PAGE: 0,
    SOLUTION_PAGE: 1,
    TESTCASES_PAGE: 2
}

export default function QuestionPage(props) { 
    const classes = useStyles();
    
    const [value, setValue] = React.useState(0);
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


    
    const changeSubpage = (event,idx) => {
        console.log("changing subpage");
        setActiveTab(idx);
    }
    function handleChange(){
        console.log("handling change");
    }
    function a11yProps(index) {
  
        return {
          id: `scrollable-auto-tab-${index}`,
          'aria-controls': `scrollable-auto-tabpanel-${index}`,
        };
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
                
                <div className={classes.horizontalContainer}>
                    <Paper square className={classes.tabs}>
                        <Tabs
                            value={value}
                            onChange={handleChange}
                            orientation="vertical"
                            variant="fullWidth"
                            indicatorColor="primary"
                            textColor="primary"
                            aria-label="icon tabs example"
                        >
                        <Tab 
                            classes={{ root: classes.tab, selected: classes.selected }}
                            label="DESCRIPTION" 
                            {...a11yProps(0)} 
                            onClick={(e)=> changeSubpage(e,0)}  
                        />
                        <Tab 
                            classes={{ root: classes.tab, selected: classes.selected }} 
                            label="SOLUTION" 
                            {...a11yProps(1)} 
                            onClick={(e)=> changeSubpage(e,1)} 
                            />
                        <Tab 
                            classes={{ root: classes.tab, selected: classes.selected }}
                            label="TEST CASES"
                            {...a11yProps(2)} 
                            onClick={(e)=> changeSubpage(e,2)} 
                        />

                        </Tabs>
                    </Paper>
                    <div className={classes.centralElements}>
                        <div className={classes.centralTextArea}>
                            {renderSubpage()}
                        </div>
                    </div>
                </div>
                
                <div className={classes.footer}>
                    <RegularButton className={classes.regularButton} label="Save" />
                </div>
            </div> 
    );

}

