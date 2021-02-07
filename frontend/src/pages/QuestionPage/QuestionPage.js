import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Navbar from '../../components/Navbar/Navbar.js'
import Swal from 'sweetalert2'
import axios from 'axios'
import { StylesProvider } from '@material-ui/core/styles';
import DescriptionSubpage from './SubPages/DescriptionSubpage/DescriptionSubpage.js'
import SolutionSubpage from './SubPages/SolutionSubpage/SolutionSubpage.js'
import TestcasesSubpage from './SubPages/TestcasesSubpage/TestcasesSubpage.js'
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Paper from '@material-ui/core/Paper';
import RegularButton from '../../components/Buttons/RegularButton.js'
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { useAuth } from "../../Context/auth";
import { Link, Redirect } from "react-router-dom";
import ConnectTo from "../../store/connect";
import {
    convertToRaw,
} from 'draft-js';

const useStyles = makeStyles((theme) => ({
    
    regularButton: {
        width: '60%',
    },
    footer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        height: 200,
        margin: 0,
        backgroundColor: theme.palette.common.black
    },
    footerWrapper: {
        marginTop: 60,
        width: '60%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'start',
    },
    tabs: {
        position: 'absolute',
        width: '11%',
        minWidth: 140,
        top: 350,
        left: 0,
        backgroundColor: theme.palette.common.black
    },
    tab: {
        color: theme.palette.common.grey,
        fontSize: 16,
        borderRadius: '5px',
        margin: '2px',
        padding: '20px',
        minHeight: '24px',
        '&$selected': {
            color: theme.palette.common.white,
            backgroundColor: theme.palette.common.black2,
        },
        '&$scroller': {
            position: 'none'
        },
        '&:hover': {
            color: theme.palette.common.white,
            backgroundColor: theme.palette.common.black2
        }
    },
    selected: {},
    scroller: {},
    minorSeparator: {
        width: '9%'
    },
    questionPage: {
        height:'1020px',
        minWidth: props => props.minWidth,
        backgroundColor: theme.palette.common.black,
        color:'white'
    },  
    centralElements: {
        display: 'flex',
        alignItems: 'center',
        backgroundColor: theme.palette.common.black,
        flexDirection: 'column',
        width: '100%'
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
        alignItems: 'center',
        position: 'relative'
    }

}));

const pageTabs = {
    DESCRIPTION_PAGE: 0,
    SOLUTION_PAGE: 1,
    TESTCASES_PAGE: 2
}

const QuestionPage = ({dispatch,solution,currentQuestion,...props}) => {
    const [minWidth, setMinWidth] = useState('893.750px')
    const classes = useStyles({minWidth});
    
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
    const [currentUser, setCurrentUser] = useState()

    // state variables: DescriptionSubpage, SolutionSubpage, TestSubpage
    let [descriptionSubpage, setDescriptionSubpage] = useState({});
    let [solutionSubpage, setSolutionSubpage] = useState({});
    let [testcasesSubpage, setTestcasesSubpage] = useState({});

    // --------------------------------------
    // HOOKS
    // --------------------------------------

    useEffect(()=>{
        if(answer.length > 0)
        {
            Swal.fire(answer);
        }
        setAnswer("");
    },[answer])

    // --------------------------------------
    // CALLBACKS
    // --------------------------------------
    const onDescriptionSubPageChange = variables => setDescriptionSubpage(Object.assign({}, variables));
    const onSolutionSubPageChange = variables => setSolutionSubpage(Object.assign({}, variables));
    const onTestcasesSubPageChange = variables => setTestcasesSubpage(Object.assign({}, variables));
    
    // --------------------------------------
    // 
    // --------------------------------------

    
    const changeSubpage = (event,idx) => {
        if (idx === 0){
            setMinWidth('893.750px');
        } else if (idx === 1) {
            setMinWidth('1093.750px');
        } else if (idx === 2) {
            setMinWidth('842.500px');
        }
        console.log("changing subpage");
        setActiveTab(idx);
    }
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
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

                    {... descriptionSubpage}
                    onPageChange={onDescriptionSubPageChange}
                />,
            [pageTabs.SOLUTION_PAGE]: 
                <SolutionSubpage {... solutionSubpage} onPageChange={onSolutionSubPageChange}/>,
            [pageTabs.TESTCASES_PAGE]: 
                <TestcasesSubpage {... testcasesSubpage} onPageChange={onTestcasesSubPageChange}/>

        }
        return subPages[activeTab];
    }
    const { authTokens, setAuthTokens } = useAuth();
    useEffect(()=>{
        if (authTokens && authTokens !== "undefined") {
            setCurrentUser(JSON.parse(authTokens).user)
        }
    },[authTokens])
    useEffect(()=>{
        if (currentQuestion){
            setQuestionSolution(currentQuestion.solution);
            setQuestionTestcases(currentQuestion.testcases);
            setQuestionTestcasesType(currentQuestion.testcasesType);
            setLanguageType(currentQuestion.languageType);
            setSolutionName(currentQuestion.solutionName);
            setQuestionDescription(currentQuestion.description);
        }
    },[currentQuestion])

    if (!authTokens || authTokens === "undefined") {
        return <Redirect to={"/login"} />;
    } 
    
    function submitQuestion(){
        if (currentUser){
            async function performSubmit(){
                console.log("submitting question")
                const userId = currentUser._id;
                console.log("this is the solution subpage: "+JSON.stringify(solutionSubpage))
                const blocks = convertToRaw(descriptionSubpage.editorState.getCurrentContent()).blocks;
                const editorStateRaw = blocks.map(block => (!block.text.trim() && '\n') || block.text).join('\n');
                
                const result = await axios({
                    method: 'post',
                    url: `/users/${userId}/questions`,
                    data: { 
                    title: descriptionSubpage.questionName,
                    difficulty: descriptionSubpage.questionDifficulty,
                    type: descriptionSubpage.questionType,
                    description: editorStateRaw,
                    solution: solution,
                    solutionName: solutionSubpage.funcName,
                    languageType: languageNameToIndex(solutionSubpage.funcLanguage),
                    returnType: solutionSubpage.functReturnType,
                    testcases: testcasesSubpage.inputs,
                    testcasesType: solutionSubpage.funcParameters,
                    }
                });  
                
            }
            performSubmit();
        }
    }
    
    function languageNameToIndex(languageName){
        switch(languageName){
            case "java":
                return 1;
            case "javascript":
                return 0;             
        }
    }

    return (
            <StylesProvider injectFirst>
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
                            <Tab disableRipple
                                classes={{ root: classes.tab, selected: classes.selected }}
                                label="DESCRIPTION" 
                                {...a11yProps(0)} 
                                onClick={(e)=> changeSubpage(e,0)}  
                            />
                            <Tab disableRipple
                                classes={{ root: classes.tab, selected: classes.selected }} 
                                label="SOLUTION" 
                                {...a11yProps(1)} 
                                onClick={(e)=> changeSubpage(e,1)} 
                                />
                            <Tab disableRipple
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
                        <div className={classes.footerWrapper}>
                            <RegularButton 
                                className={classes.regularButton} 
                                onClick={submitQuestion}
                                label="Save" 
                            />
                        </div>
                    </div>
                </div> 
            </StylesProvider>
    );

}



function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`scrollable-auto-tabpanel-${index}`}
        aria-labelledby={`scrollable-auto-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={3}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
  };

const mapStateToProps = ({ solution, currentQuestion }, props) => {
    return {
        solution,
        currentQuestion,
        ...props
    };
};
  
export default ConnectTo(mapStateToProps)(QuestionPage);
  