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
        width: '60%',
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
        overflow: 'visible'
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
        display: 'inline',
        fontSize: '1rem',
        marginLeft: '30px',
        margin: '10px 0',
        cursor: 'pointer',
    },
    focusedInput: {
        color: theme.palette.common.white,
        backgroundColor: theme.palette.common.black,
        fontSize: '1rem',
        marginLeft: '30px',
        margin: '10px 0',
        borderStyle: 'none',
        borderBottom: `.1px solid ${theme.palette.common.grey}`,
        padding: '0',
        cursor: 'pointer',
    },
    divider: {
        ...theme.divider,
        zIndex: -1,
        position: 'relative'
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
    editIcon: {
    },
    deleteIcon: {
    },
  }));

export default function TestInputList() {
    const classes = useStyles();
    const theme = useTheme();
    const [inputs, setInputs] = useState(['nums1', 'nums2', 'nums3']);
    const [activeRowItem, setActiveRowItem] = useState();
    const [editing, setEditing] = useState(false)
    //const prevInputs = usePrevious(inputs);

    const deleteRow = (e, idx) => {
        e.preventDefault();
        let newInputs = [...inputs];
        newInputs.splice(activeRowItem, 1);
        setInputs(newInputs);
        setEditing(false);
        setActiveRowItem(-1);
    }
    useEffect(()=>{
        if (editing === true){
            let elmt = document.querySelector(`#input-${activeRowItem}`);
            elmt.value = inputs[activeRowItem];
            elmt.focus();
        }
    },[editing])

    const editRow = (e, idx) => {
        setEditing(true);
    }

    const onClickHandler = (e) => {
        setInputs([...inputs, "nums4"])
    }
    const onClickRowItem = (event,idx) => {
        console.log("clicked row item "+idx);
        setEditing(false);
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

    function generateRow(input,idx) {
        if (idx === activeRowItem){
            return (
                <div className={classes.activeRow} key={`input-${idx}`}>
                    <IconButton 
                        className={classes.editIcon} 
                        width={32} 
                        height={32} 
                        padding={6} 
                        onClick={(e) => { editRow(e,idx) }} icon={<EditIcon />} 
                    />
                    <IconButton 
                        className={classes.deleteIcon} 
                        width={32} 
                        height={32} 
                        padding={6} 
                        onClick={(e) => { deleteRow(e,idx) } } icon={<DeleteIcon />}
                    />
                    {
                        editing 
                    ? <input id={`input-${idx}`} className={classes.focusedInput} placeholder={input} />
                    : <p className={classes.selectedInput}>{input}</p>
                    }
                    {/*<input id={`input-${idx}`} className={classes.input} placeholder={input} />*/}
                    
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
                <a className={classes.tag}>20 max</a>
            </div>
            <hr className={classes.divider} />
            <div className={classes.subtitleContainer}>
                <HashIcon style={{'height': '12px', width: '12px'}} />
                <p>Value</p>
            </div>
            <hr className={classes.divider} />
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
            <hr className={classes.divider} />
            <Button variant="outlined" disableFocusRipple disableRipple className={classes.saveButton}>Save</Button>
        </div>
    );
}