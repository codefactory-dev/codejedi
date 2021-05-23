import React, { useState, useEffect } from 'react';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import api from 'services/api'

import { useAuth } from "Context/auth";
import { useHistory } from "react-router-dom";
import ConnectTo from "store/connect";


import Swal from 'sweetalert2'

import IconButton from 'components/Buttons/IconButton';

import {ReactComponent as HashIcon} from 'icons/hashtag.svg';
import {ReactComponent as AddIcon} from 'icons/add.svg';


import {ReactComponent as CrossIcon} from 'icons/cross.svg';
import {ReactComponent as YesIcon} from 'icons/yes.svg';

import './BrowseList.scss'
import { selectCurrentQuestionAction } from 'store/reducers/currentQuestion';
//import { selectCurrentSubmissionAction } from "store/reducers/currentSubmission";

const { usePrevious } = require('utils/useful.js')

const useStyles = makeStyles(theme => ({
    root: {
        fontFamily: 'Lato',
        fontWeight: '700',
        height: '100vh',
        boxSizing: 'border-box',
        padding: '30px 10px',
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.greyLight,
        flexShrink: 1,
        marginRight: 'auto',
        marginLeft: 'auto',
        width: '60%',
        minWidth: '296.493px',
        marginTop: 60
        
    },
    titleContainer: {
        display: 'flex',
        alignItems: 'center',
        padding: '15px 0'
    },
    title: {
        marginRight: '15px',
        fontSize: '1.4rem',
    },
    tag: {
        padding: '5px 10px',
        backgroundColor: theme.palette.primary.main,
        borderRadius: '15px',
        fontSize: '.65rem',
        fontWeight: 700,
        
    },
    subtitleContainer: {
        display: 'flex',
        alignItems: 'center',
        padding: '10px 10px 10px 0',
        fill: theme.palette.common.grey3,
        

        '& p': {
            ... theme.listSubtitle,
            marginLeft: '10px',
            color: theme.palette.common.white,
            fontSize: '1rem'
        }
    },
    contentContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
    },
    input: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        color: theme.palette.common.white,
        backgroundColor: theme.palette.common.black,
        fontSize: '1rem',
        height: 37,
        borderStyle: 'none',
        cursor: 'pointer',
        '& > span': {
            margin: '0',
            marginLeft: '10px',
            display: 'inline'
        }
    },
    selectedInput: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        color: theme.palette.common.white,
        backgroundColor: theme.palette.common.black,
        fontSize: '1rem',
        width: '100%',
        height: '100%',
        //border
        borderStyle: 'none',
        cursor: 'pointer',
        backgroundColor: theme.palette.common.black2,
        '& > span': {
            margin: '0',
            marginLeft: '10px',
            display: 'inline',
        },
    },
    focusedInput: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        color: theme.palette.common.white,
        backgroundColor: theme.palette.common.black,
        fontSize: '1rem',
        width: '100%',
        height: 28,
        //border
        borderStyle: 'none',
        cursor: 'pointer',
        backgroundColor: theme.palette.common.black2,
        borderRadius: '5px',
        '& > input':{
            color: theme.palette.common.white,
            backgroundColor: theme.palette.common.black2,
            fontFamily: 'Lato',
            fontSize: '1rem',
            width: '100%',
            border: 0,
            borderTop: `.1px solid rgba(0,0,0,0)`,
            borderBottom: `.1px solid ${theme.palette.common.grey2}`,
            cursor: 'pointer',
            fontWeight: '700',
            marginLeft: '15.5px',
            padding: 0
        }
    },
    divider: {
        ...theme.divider,
        zIndex: 0,
        position: 'relative',
        minWidth: '225.297px',
        backgroundColor: theme.palette.common.grey2
    },
    addContainer: {
        display: 'inline-flex',
        alignItems: 'center', 
        marginLeft: '25px',
        fill: theme.palette.common.grey3,
        padding: '5px',
        borderRadius: '5px',
        margin: '5px 0',
        '&:hover': {
            cursor: 'pointer',
            backgroundColor: theme.palette.common.black2,
        },
    },
    newButton: {
        ...theme.listSubtitle,
        marginLeft: '5px',   
    },
    saveButton: {
        ... theme.btnPrimaryOutline,
        margin: '40px 0',
    },
    inactiveRow: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        borderBottom: `solid ${theme.palette.common.grey2} 1px`,
        width: '100%',
    },
    activeRow: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        borderBottom: `solid ${theme.palette.common.grey2} 1px`,
        borderColor: theme.palette.common.grey,
        fill: theme.palette.common.grey3,
        padding: '0',
        height: 37,
        cursor: 'pointer',
    },
    confirmingDeleteText: {
        color: theme.palette.secondary.main,
        fontWeight: 100
    },
  }));
const rowStates = {
    DESELECTED: 0,
    EDITING_ROW: 1,
    CONFIRMING_DELETE: 2
}
const BrowseList = ({dispatch,currentQuestion,...props}) => {
    let history = useHistory();
    const classes = useStyles();
    const matches = useMediaQuery('(min-width:798px)');
    const theme = useTheme();
    const [inputs, setInputs] = useState(['nums1', 'nums2', 'nums3']);
    const [activeRowItem, setActiveRowItem] = useState();
    const [editingState, setEditingState] = useState(rowStates.DESELECTED)
    const [maxInputTag, setMaxInputTag] = useState('20 max');
    const [questionsList, setQuestionsList] = useState([]);
    const { authTokens, setAuthTokens } = useAuth();
    //const prevInputs = usePrevious(inputs);

    const selectCurrentSubmissionHandler = async (question) => {
        try {
            const allSubmissions = await api({
                method: 'get',
                url: `/users/${question._id}/submissions`
            });  
            const submission = allSubmissions.data[allSubmissions.data.length - 1];
            let currentQuestion = {...question, submission: { ...submission }}
            dispatch(selectCurrentQuestionAction(currentQuestion))
        } catch(error) {
            throw new Error(`Couldn't get user submissions`)
        }
        
    }

    const deleteCurrentRow = () => {
        let newInputs = [...inputs];
        newInputs.splice(activeRowItem, 1);
        setInputs(newInputs);
        setEditingState(rowStates.DESELECTED);
        setActiveRowItem(-1);
    }
    const askForDelete = (e, idx) => {
        e.preventDefault();
       setEditingState(rowStates.CONFIRMING_DELETE);
    }
    useEffect(()=>{
        if (editingState === rowStates.EDITING_ROW){
            let elmt = document.querySelector(`#input-${activeRowItem}`);
            elmt.value = inputs[activeRowItem];
            elmt.focus();
        }
    },[editingState])


    useEffect(()=>{
        if (authTokens){
            console.log("this is the user id: "+JSON.parse(authTokens).user._id);
            async function getQuestionsList()
            {
                //const fetchedQuestions = await axios.get(`/users/${JSON.parse(authTokens).user._id}/questions`)
                const fetchedQuestions = await api.get(`/questions`)
                //console.log("fetched questions from backend: "+JSON.stringify(fetchedQuestions))                
                setInputs(fetchedQuestions.data);    
            }
            getQuestionsList();
        }
    },[])
    
    const navigateToQuestion = async (input) => {
        try {
            //here should be the code to navigate to the selected question
            await selectCurrentSubmissionHandler(input)
            history.push('/question')
        } catch (error) {
            throw new Error('Navigate to question failed. '+error);
        }        
    }

    const onClickHandler = (e) => {
        setInputs([...inputs, "another"])
    }
    const onClickRowItem = (event,idx) => {
        //console.log("clicked row item "+idx);
        setEditingState(rowStates.DESELECTED);
        setActiveRowItem(idx);
    }
    const onFormSubmit = (e) => {
        e.preventDefault();
        let newInputs = [...inputs];
        const activeRowValue = document.querySelector(`#input-${activeRowItem}`).value;
        //if string contains only whitespaces, don't change anything
        if (activeRowValue.trim()){
            newInputs[activeRowItem] = document.querySelector(`#input-${activeRowItem}`).value;
        }
        console.log("new inputs: "+JSON.stringify(newInputs));
        setInputs(newInputs);
        setActiveRowItem(-1);
    }

    function handleYes(question){
        async function deleteQuestion(questionId){
            try {
                let userId = question.creator.id;
                let questionId = question._id;
                const result = await api({
                    method: 'delete',
                    url: `/users/${userId}/questions/${questionId}`,
                });  
                if (result.status === 200){
                    deleteCurrentRow();
                    Swal.fire('deleted !');
                }
            } catch (error){
                Swal.fire('failed to delete !');
            }
            
        }
        deleteQuestion();
        
    }
    function handleNo(){
        setEditingState(rowStates.DESELECTED);
    }
    function deselectCurrentItem(event){
        console.log("deselecting current item");
        const activeRowElement = document.querySelectorAll('div[class^="makeStyles-activeRow"]');
        setActiveRowItem(-1);
        setEditingState(rowStates.DESELECTED);
    }
    const getDeletionState = (input,idx) => ({
        [rowStates.DESELECTED]: 
            <div className={classes.selectedInput}>
                <IconButton 
                            className={classes.deleteIcon} 
                            width={19.5} 
                            height={20} 
                            padding={3} 
                            marginLeft={5}
                            fill={`${theme.palette.primary.main}`}
                            stroke={'none'}
                            fillHover={'white'}
                            strokeHover={'none'}
                            borderRadius={'3px'}
                            icon={<CrossIcon />}
                            onClick={(e) => { askForDelete(e,idx) } } 
                />
                <span onClick={()=>{navigateToQuestion(input)}}>{input.title}</span>
                <span onClick={()=>{navigateToQuestion(input)}}>{input.creator ? '| Author: '+input.creator.username : ''}</span>
            </div>,
        [rowStates.EDITING_ROW]: 
            <div className={classes.focusedInput}>
                <IconButton 
                            className={classes.deleteIcon} 
                            width={19.5} 
                            height={20} 
                            padding={3} 
                            marginLeft={5}
                            fill={`${theme.palette.primary.main}`}
                            stroke={'none'}
                            fillHover={'white'}
                            strokeHover={'none'}
                            borderRadius={'3px'}
                            icon={<CrossIcon />}
                            onClick={(e) => { askForDelete(e,idx) } } 
                />
                <input 
                    id={`input-${idx}`} 
                    maxlength="20"
                />
            </div>,
        [rowStates.CONFIRMING_DELETE]: 
            <div className={classes.selectedInput}>
                <IconButton 
                            className={classes.confirmingDeleteIcon} 
                            width={19.5} 
                            height={20} 
                            padding={3} 
                            marginLeft={5}
                            fill={`${theme.palette.secondary.main}`}
                            stroke={'none'}
                            fillHover={'white'}
                            strokeHover={'none'}
                            borderRadius={'3px'}
                            icon={<YesIcon />}
                            onClick={(e) => { handleYes(input) } } 
                />
                <span className={classes.confirmingDeleteText}>{matches ? 'Are you sure to delete this row ?' : 'Remove selected item ?'}</span>
            </div>
    })
    

    function generateRow(input,idx) {
        if (idx === activeRowItem){
            return (
                <div 
                    className={classes.activeRow} 
                    onMouseLeave={(event)=> {
                        if (editingState !== rowStates.EDITING_ROW){
                            deselectCurrentItem(event)}
                        }
                    }
                    key={`input-${idx}`}
                    >
                    {getDeletionState(input,idx)[editingState]} 
                </div>
            )
        }
        else {
            return(
                <div 
                    className={classes.inactiveRow} 
                    onMouseEnter={(event)=> {onClickRowItem(event,idx)}} 
                    >
                    {/*<input className={classes.input} placeholder={input} />*/}
                    <div 
                        className={classes.input}
                        onClick={(event) => {onClickRowItem(event,idx) }} >
                            <span>{input.title}</span>
                            <span>{input.creator ? '| Author: '+input.creator.username : ''}</span>
                    </div>
                </div>
            )
        }
    }


    function createQuestion(){
        history.push('/question')
    }

    return (
        <div className={classes.root}>
            <div className={classes.subtitleContainer}>
                <p>Title</p>
            </div>
            <hr className={classes.divider} />
            <div className={classes.wrapper}>
                <div className={classes.contentContainer}>
                    <form 
                        //onBlur in React is used instead of onFocusOut
                        /*onBlur={(e) => {onFormSubmit(e)}}*/
                        onSubmit={(e) => {onFormSubmit(e)}}>
                        {inputs && inputs.length > 0 && inputs.map((input, idx) => {
                            return (
                                    generateRow(input,idx)
                        )})}
                    </form>
                </div>
            </div>
            <Button onClick={createQuestion} variant="outlined" disableFocusRipple disableRipple className={classes.saveButton}>Create a Question</Button>
        </div>
    );
}

const mapStateToProps = ({ currentQuestion }, props) => {
    return {
        currentQuestion,
        ...props
    };
};
  
export default ConnectTo(mapStateToProps)(BrowseList);