import React, {useState, useEffect } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import ParameterInputList from '../../../../components/List/ParameterInputList';
import CustomSelect from '../../../../components/Select/CustomSelect.js'
import SimpleTextField from '../../../../components/TextField/SimpleTextField.js'
import CodeEditor from '../../../../components/CodeEditor/CodeEditor';

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
    colFlex: {
        display: "flex", 
        width: "100%"
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


export default function SolutionSubpage() {
    const classes = useStyles();
    const theme = useTheme();

    const languages = ['java', 'javascript'];
    const returnTypes = ['int', 'string'];

    let [funcName, setFuncName] = useState('');
    let [funcLanguage, setFuncLanguage] = useState(languages[0]);
    let [functReturnType, setFuncReturnType] = useState(returnTypes[0]);
    let [funcParameters, setFuncParams] = useState([]);
    let [toggleCodeReload, setToggleCodeReload] = useState(false);
    let userCode = ``;

    // ------------------------------------------------------------------
    // HOOKS
    // ------------------------------------------------------------------

    useEffect(() => {
        setToggleCodeReload(!toggleCodeReload);
    }, [funcName, funcParameters, functReturnType, funcLanguage]);

    // ------------------------------------------------------------------
    //
    // ------------------------------------------------------------------

    const generateFunctionSignature = () => {       
        let params;

        switch(funcLanguage) {
            case 'javascript':
                params =   funcParameters.reduce((acc, input, idx) => {
                    return `${acc}${input.name}${idx === funcParameters.length-1 ? `` : `, `}`
                }, ``);
     
                return `var ${funcName} = function(${params}) {\n \n \n}`;
                break;


            case 'java':
                params = funcParameters.reduce((acc, input, idx) => {
                    return `${acc}${input.type} ${input.name}${idx === funcParameters.length-1 ? `` : `, `}`
                }, ``);
        
                return `class Solution {\n   public ${functReturnType} ${funcName} (${params}) {\n \n\n  }\n}`;
                break;
        }


       
    }


    // ------------------------------------------------------------------
    // HANDLERS, CALLBACKS
    // ------------------------------------------------------------------

    const onParameterInputListChange = inputs => setFuncParams([...inputs]);

    const handleCodeChange = code => {
        // functionSignatureCode = code;
    }

    const onFunctionNameChange = evt => setFuncName(evt.target.value);

    const onFunctionLanguageChange = value => setFuncLanguage(value);

    const onFunctionReturnTypeChange = value => setFuncReturnType(value);
    

    return (
        <div className={classes.root}>
            {/* title row */}
            <div className={classes.colFlex}>
                <div className={classes.colFlex3} style={{}}>
                    <span className={classes.title}>Function name</span>
                    <SimpleTextField onChange={onFunctionNameChange}/>
                </div>
                <div className={classes.colFlex1}>
                    <span className={classes.title}>Language</span>
                    <CustomSelect options={languages} checkedOptionIndex={0} onChange={onFunctionLanguageChange} />
                </div>
                <div className={classes.colFlex1}>
                    <span className={classes.title}>Return type</span>
                    <CustomSelect options={returnTypes} checkedOptionIndex={0} onChange={onFunctionReturnTypeChange}/>
                </div>
            </div>

            {/* title row */}
            <div className={classes.titleContainer}>
                    <span className={classes.title}>Parameters</span>
            </div>
            <div className={classes.listContainer}>
                <ParameterInputList onParameterInputChange={onParameterInputListChange} />
            </div>

            {/* title row */}
            <div className={classes.titleContainer}>
                    <span className={classes.title}>Write your solution below</span>
            </div>
            <CodeEditor loadedCode={toggleCodeReload} code={generateFunctionSignature()} setCode={handleCodeChange}/>
        </div>
    );

}

