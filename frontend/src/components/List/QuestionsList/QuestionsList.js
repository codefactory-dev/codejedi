import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import IconButton from '../../Buttons/IconButton';

import {ReactComponent as HashIcon} from '../../../icons/hashtag.svg';
import {ReactComponent as AddIcon} from '../../../icons/add.svg';


import {ReactComponent as CrossIcon} from '../../../icons/cross.svg';

import './QuestionsList.scss'

const { usePrevious } = require('../../../utils/useful.js')

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
        marginLeft: '5px',
        padding: '10px',
        fill: theme.palette.common.grey3,
        

        '& p': {
            ... theme.listSubtitle,
            marginLeft: '5px'
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
        minWidth: '225.297px'
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
  }));
const rowStates = {
    DESELECTED: 0,
    EDITING_ROW: 1,
    CONFIRMING_DELETE: 2
}
export default function QuestionsList() {
    const classes = useStyles();
    const matches = useMediaQuery('(min-width:798px)');
    const theme = useTheme();
    const [inputs, setInputs] = useState(['nums1', 'nums2', 'nums3']);
    const [activeRowItem, setActiveRowItem] = useState();
    const [editingState, setEditingState] = useState(rowStates.DESELECTED)
    const [maxInputTag, setMaxInputTag] = useState('20 max');
    //const prevInputs = usePrevious(inputs);

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

    const editRow = (e, idx) => {
        setEditingState(rowStates.EDITING_ROW);
    }

    const onClickHandler = (e) => {
        setInputs([...inputs, "another"])
    }
    const onClickRowItem = (event,idx) => {
        console.log("clicked row item "+idx);
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

    function handleYes(){
        deleteCurrentRow();
    }
    function handleNo(){
        setEditingState(rowStates.DESELECTED);
    }
    function deselectCurrentItem(event){
        console.log("deselecting current item");
        const activeRowElement = document.querySelectorAll('div[class^="makeStyles-activeRow"]');
        //setActiveRowItem(-1);
        //setEditingState(rowStates.DESELECTED);
    }
    const getDeletionState = (input,idx) => ({
        [rowStates.DESELECTED]: 
            <div className={classes.selectedInput}>
                <span onClick={()=>{editRow()}}>{input}</span>
            </div>,
        [rowStates.EDITING_ROW]: 
            <div className={classes.focusedInput}>
                <input 
                    id={`input-${idx}`} 
                    maxlength="20"
                />
            </div>,
        [rowStates.CONFIRMING_DELETE]: 
            <div className={classes.selectedInput}>
                <span>{matches ? 'Do you want to remove the selected item ?' : 'Remove selected item ?'}</span>
                <div style={{marginLeft: 10}} onClick={()=>{handleYes()}}>Yes</div>
                <div style={{marginLeft: 10}} onClick={()=>{handleNo()}}>no</div>
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
                            <span>{input}</span>
                    </div>
                </div>
            )
        }
    }

    

    return (
        <div className={classes.root}>
            <div className={classes.titleContainer}>
                <span className={classes.title}>Input</span>
                <a className={classes.tag}>{maxInputTag}</a>
            </div>
            <hr className={classes.divider} />
            <div className={classes.subtitleContainer}>
                <HashIcon style={{'height': '12px', width: '12px'}} />
                <p>Value</p>
            </div>
            <hr className={classes.divider} />
            <div className={classes.wrapper}>
                <div className={classes.contentContainer}>
                    <form 
                        //onBlur in React is used instead of onFocusOut
                        /*onBlur={(e) => {onFormSubmit(e)}}*/
                        onSubmit={(e) => {onFormSubmit(e)}}>
                        {inputs.map((input, idx) => {
                            return (
                                    generateRow(input,idx)
                        )})}
                    </form>
                </div>
            </div>
            <Button variant="outlined" disableFocusRipple disableRipple className={classes.saveButton}>Submit a Question</Button>
        </div>
    );
}