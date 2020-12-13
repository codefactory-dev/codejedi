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

    let [funcName, setFuncName] = useState('');
    let functionLanguage = 'Java';
    let functionReturnType = 'int';
    let [funcParameters, setFuncParams] = useState([]);
    let [toggleCodeReload, setToggleCodeReload] = useState(false);
    let userCode = ``;

    // ------------------------------------------------------------------
    // HOOKS
    // ------------------------------------------------------------------

    useEffect(() => {
        setToggleCodeReload(!toggleCodeReload);
    }, [funcParameters, funcName]);

    // ------------------------------------------------------------------

    const generateFunctionSignature = () => {       
        let params = funcParameters.reduce((acc, input, idx) => {
            return `${acc}${input.type} ${input.name}${idx === funcParameters.length-1 ? `` : `, `}`
        }, ``);

        return `class Solution { 
    public ${functionReturnType} ${funcName} (${params}) {
            ${userCode}
    }
}`;
    }


    // ------------------------------------------------------------------
    // HANDLERS, CALLBACKS
    // ------------------------------------------------------------------

    const onParameterInputListChange = inputs => {
        setFuncParams([...inputs]);
    }

    const handleCodeChange = code => {
        // functionSignatureCode = code;
    }

    const onFunctionNameChange = evt => {
        setFuncName(evt.target.value);
    }

    return (
        <div className={classes.root}>
            {/* title row */}
            <div style={{display: "flex", width: "100%"}}>
                <div className={classes.colFlex3} style={{}}>
                    <span className={classes.title}>Function name</span>
                    <SimpleTextField onChange={onFunctionNameChange}/>
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

