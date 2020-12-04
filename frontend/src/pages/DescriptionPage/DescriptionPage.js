import React, {useState, useEffect } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import ParameterInputList from '../../components/List/ParameterInputList';
import CustomSelect from '../../components/Select/CustomSelect.js'
import SimpleTextField from '../../components/TextField/SimpleTextField.js'
import CodeEditor from '../../components/CodeEditor/CodeEditor';

const useStyles = makeStyles(theme => ({
    root: {
        boxSizing: 'border-box',
        padding: '30px 30px',
        margin: '0',
        backgroundColor: theme.palette.common.black,
        height: '100vh',
    },
    titleContainer: {
        display: 'flex',
        alignItems: 'center',
        margin: '10px 0px'
    },
    title: {
        marginRight: '15px',
        fontSize: '1rem',
        color: theme.palette.common.greyLight,
        fontFamily: 'Lato',
        fontWeigth: '700',
    },

    listContainer: {
        // padding: '20px'
    },

    colFlex3: {
        display: "flex", 
        flexDirection: "column", 
        flexGrow: "3"
    },
    colFlex1: {
        display: "flex", 
        flexDirection: "column", 
        flexGrow: "1"
    }
}));




export default function DescriptionPage() {
    const classes = useStyles();
    const theme = useTheme();

    let defaultCode = `class Solution { }`;

    // ------------------------------------------------------------------
    // HANDLERS, CALLBACKS
    // ------------------------------------------------------------------

    const handleCodeChange = code => {
        defaultCode = code;
        console.log(defaultCode);
    }

    return (
        <div className={classes.root}>
            {/* title row */}
            <div style={{display: "flex", width: "100%"}}>
                <div className={classes.colFlex3} style={{}}>
                    <span className={classes.title}>Function name</span>
                    <SimpleTextField />
                </div>
                <div className={classes.colFlex1}>
                    <span className={classes.title}>Language</span>
                    <CustomSelect />
                </div>
                <div className={classes.colFlex1}>
                    <span className={classes.title}>Return type</span>
                    <CustomSelect />
                </div>
            </div>

            {/* title row */}
            <div className={classes.titleContainer}>
                    <span className={classes.title}>Parameters</span>
            </div>
            <div className={classes.listContainer}>
                <ParameterInputList />
            </div>

            {/* title row */}
            <div className={classes.titleContainer}>
                    <span className={classes.title}>Write your solution below</span>
            </div>
            <CodeEditor code={defaultCode} setCode={handleCodeChange}/>
        </div>
    );

}