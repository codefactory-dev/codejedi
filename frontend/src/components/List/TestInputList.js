import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import IconButton from '../Buttons/IconButton';

import {ReactComponent as HashIcon} from '../../icons/hashtag.svg';
import {ReactComponent as AddIcon} from '../../icons/add.svg';


import {ReactComponent as EditIcon} from '../../icons/edit.svg';
import {ReactComponent as DeleteIcon} from '../../icons/delete.svg';

import './TestInputList.scss'

const { usePrevious } = require('../../utils/useful.js')

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
        paddingLeft: 100,
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
    wrapper: {
    },
    contentContainer: {
        overflow: 'visible',
        minWidth: '225.297px'
    },
    input: {
        color: theme.palette.common.white,
        backgroundColor: theme.palette.common.black,
        fontSize: '1rem',
        marginLeft: '30px',
        margin: '10px 0',
        borderStyle: 'none',
        padding: '0',
        cursor: 'pointer',
    },
    selectedInput: {
        margin: 0,
        fontSize: '1rem',
        position: 'absolute',
        top: '50%',
        left: 127,
        msTransform: 'translateY(-50%)',
        transform: 'translateY(-50%)',
        '& > div': {
            display: 'inline',
            marginLeft: 15,
            cursor: 'pointer',
        }
    },
    focusedInput: {
        color: theme.palette.common.white,
        backgroundColor: theme.palette.common.black,
        fontSize: '1rem',
        position: 'absolute',
        top: '50%',
        left: 127,
        msTransform: 'translateY(-50%)',
        transform: 'translateY(-50%)',

        borderStyle: 'none',
        width: 85,
        borderBottom: `.1px solid ${theme.palette.common.grey}`,
        padding: '0',
        cursor: 'pointer',
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
    activeRow: {
        position: 'relative',
        left: -100,
        height: 39,
        backgroundColor: theme.palette.common.black2,
        width: `calc(100% + 100px)`,
        borderStyle: 'solid',
        borderWidth: '0.05rem',
        overflow: 'visible',
        borderColor: theme.palette.common.grey,
    },
  }));
const rowStates = {
    DESELECTED: 0,
    EDITING_ROW: 1,
    CONFIRMING_DELETE: 2
}
export default function TestInputList() {
    const classes = useStyles();
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
    const getDeletionState = (input,idx) => ({
        [rowStates.DESELECTED]: <p className={classes.selectedInput}>{input}</p>,
        [rowStates.EDITING_ROW]: <input id={`input-${idx}`} className={classes.focusedInput}/>,
        [rowStates.CONFIRMING_DELETE]: <p className={classes.selectedInput}>Do you want to remove the selected item ? 
        <div onClick={()=>{handleYes()}}>Yes</div><div onClick={()=>{handleNo()}}>no</div></p>
    })
    

    function generateRow(input,idx) {
        if (idx === activeRowItem){
            return (
                <div className={classes.activeRow} key={`input-${idx}`}>
                    <IconButton 
                        className={classes.deleteIcon} 
                        width={32} 
                        height={32} 
                        padding={6} 
                        position={'absolute'}
                        top={'50%'}
                        left={'1rem'}
                        msTransform={'translateY(-50%)'}
                        transform={'translateY(-50%)'}
                        onClick={(e) => { askForDelete(e,idx) } } icon={<DeleteIcon />}
                    />
                    <IconButton 
                        className={classes.editIcon} 
                        width={32} 
                        height={32} 
                        padding={6} 
                        position={'absolute'}
                        top={'50%'}
                        left={'4rem'}
                        msTransform={'translateY(-50%)'}
                        transform={'translateY(-50%)'}
                        onClick={(e) => { editRow(e,idx) }} icon={<EditIcon />} 
                    />
                    {getDeletionState(input,idx)[editingState]} 
                    
                    <hr className={classes.divider} />
                </div>
            )
        }
        else {
            return(
                <React.Fragment key={`input-${idx}`}>
                    {/*<input className={classes.input} placeholder={input} />*/}
                    <p onClick={(event) => {onClickRowItem(event,idx) }} className={classes.input}>{input}</p>
                    <hr className={classes.divider} />
                </React.Fragment>
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
                    <div className={classes.addContainer}>
                        <AddIcon style={{'height': '12px', width: '12px'}} />
                        <a onClick={onClickHandler} className={classes.newButton}>New</a>
                    </div>
                </div>
            </div>
            <hr className={classes.divider} />
            <Button variant="outlined" disableFocusRipple disableRipple className={classes.saveButton}>Save</Button>
        </div>
    );
}