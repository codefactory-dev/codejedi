import React, { useRef, useState, useEffect } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import ParameterInputList from '../../../../components/List/ParameterInputList';
import CustomSelect from '../../../../components/Select/CustomSelect.js'
import SimpleTextField from '../../../../components/TextField/SimpleTextField.js'
import CodeEditor from '../../../../components/CodeEditor/CodeEditor';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import CodeMirror from 'codemirror';
import { saveSolutionAction } from "../../../../store/reducers/solution";
import ConnectTo from "../../../../store/connect";

/*root: {
        boxSizing: 'border-box',
        padding: '30px 30px',
        margin: '0',
        backgroundColor: theme.palette.common.black,
        height: '100vh',
*/
const useStyles = makeStyles(theme => ({
    
    root: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%'
    },
    verticalContainer: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        minWidth: 893.750,
        alignItems: 'start'
    },
    titleContainer: {
        display: 'flex',
        flexDirection: 'row',
        width: '60%',
        marginTop: 20,
        height: 60,
        minWidth: 503,
        paddingLeft: 0,
        paddingRIght: 0
    },
    bodyContainer: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    bodyWrapper: {
        display: 'flex',
        flexDirection: 'column',
        width: '60%',
        alignItems: 'start'
    },
    section: {
        display: 'block',
        marginTop: '50px'
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
        flexGrow: "1",
        marginLeft: 10
    },
    saveButton: {
        alignSelf: 'flex-start',
        ... theme.btnPrimaryOutline,
        margin: '40px 0',
    }
}));

// -------------------------------------------------------------------------
// GLOBAL VARIABLES and HELPERS
// -------------------------------------------------------------------------

const PROGRAMMING_LANGUAGES = {
    JAVA: 'java', 
    JAVASCRIPT: 'javascript'
};
const FUNCTION_RETURN_TYPES = {
    INT: 'int', 
    STRING: 'String'
};

const getKeyByValue = (object, value) => {
    return Object.keys(object).find(key => object[key] === value);
}

const getKeyIndexByValue = (object, value) => {
    const keys = Object.keys(object);
    return keys.indexOf(getKeyByValue(object, value));
}


function SolutionSubpage({dispatch, solution, ...props}) {
    const classes = useStyles();
    const theme = useTheme();
    const [codemirror, setCodeMirror] = useState(null)
    const textareaNode = useRef();

    let [funcName, setFuncName] = useState(props.funcName || 'Solution');
    let [funcLanguage, setFuncLanguage] = useState(props.funcLanguage);
    let [functReturnType, setFuncReturnType] = useState(props.functReturnType);
    let [funcParameters, setFuncParams] = useState(props.funcParameters);
    let [funcSolutionCode, setFuncSolutionCode] = useState()
    let userCode = ``;
    const languageModes = new Map([['javascript', 'javascript'], ['java', 'text/x-java'], ['c++', 'text/x-c++src']]);
    let selectedLanguage = 'java';

    // ------------------------------------------------------------------
    // HOOKS
    // ------------------------------------------------------------------

    useEffect(() => {
        if(props.funcName === undefined) { return; }

        // load props
        setFuncName(props.funcName);
        setFuncLanguage(props.funcLanguageType);
        setFuncReturnType(props.functReturnType);
        setFuncSolutionCode(props.funcSolutionCode)
        setFuncParams(props.funcParameters);

    }, []);

    useEffect(() => {
        let functionSignature = generateFunctionSignature()
        if (codemirror){
            codemirror.setValue("");
            codemirror.clearHistory();
            let chosenMode = funcLanguage ? funcLanguage.toLowerCase() : 'java';
            let languageMode = languageModes.get(chosenMode)
            codemirror.setOption('mode', languageMode);
        }
        setFuncSolutionCode(functionSignature)
    }, [funcLanguage, 
        funcParameters])

    useEffect(() => {
        props.onPageChange({funcName, funcParameters, functReturnType, funcSolutionCode, funcLanguage});

    }, [funcName, 
        funcParameters, 
        functReturnType, 
        funcSolutionCode,
        funcLanguage]);
    
    // set codemirror default configs + code
    useEffect(() => {
        let codeMirrorInstance = CodeMirror.fromTextArea(textareaNode.current, {
            lineNumbers: true,
            mode: languageModes.get(funcLanguage),
            matchBrackets: true
        });
        
        codeMirrorInstance.on("change", changeObj => {    
            dispatch(saveSolutionAction(changeObj.doc.getValue()))
        });

        setCodeMirror(codeMirrorInstance)
        
        

    }, []);
    useEffect(() => {
        if (funcLanguage){
            if (codemirror){
                if (solution) {
                    textareaNode.current.innerHTML = solution;
                }
                codemirror.focus();
            }
        }
    }, [funcLanguage,
        codemirror,
        solution])

    
    useEffect(() => {    
        
        function insertTextAtCursor(editor, text) {
            var doc = editor.getDoc();
            var cursor = doc.getCursor();
            doc.replaceRange(text, cursor);
        }
        
        if (funcSolutionCode){
            if (codemirror){
                insertTextAtCursor(codemirror, funcSolutionCode)
            }
        }
    
    
    }, [funcSolutionCode]);

    // ------------------------------------------------------------------
    //
    // ------------------------------------------------------------------

    const generateFunctionSignature = () => {       
        let params;
    
        if (funcLanguage){
            let lowercaseFuncLanguage = funcLanguage.toLowerCase();
            switch(lowercaseFuncLanguage) {
                case PROGRAMMING_LANGUAGES.JAVASCRIPT:
                    params =   funcParameters && funcParameters.reduce((acc, input, idx) => {
                        return `${acc}${input.name}${idx === funcParameters.length-1 ? `` : `, `}`
                    }, ``);
            
                    return `var ${funcName} = function(${params}) {\n \n \n}`;
                    break;
    
    
                case PROGRAMMING_LANGUAGES.JAVA:
                    params = funcParameters.reduce((acc, input, idx) => {
                        return `${acc}${input.type} ${input.name}${idx === funcParameters.length-1 ? `` : `, `}`
                    }, ``);
            
                    return `class Solution {\n   public ${functReturnType} ${funcName} (${params}) {\n \n\n  }\n}`;
                    break;
            }
        } 
        return '';
    }


    // ------------------------------------------------------------------
    // HANDLERS, CALLBACKS
    // ------------------------------------------------------------------

    const onParameterInputListChange = inputs => setFuncParams([...inputs]);

    const handleCodeChange = code => {
        setFuncSolutionCode(code);
    }

    const onFunctionNameChange = evt => setFuncName(evt.target.value);

    const onFunctionLanguageChange = evt => {
        const value = evt.target.value;

        // check if 'value' is valid language
        const validate = Object.keys(PROGRAMMING_LANGUAGES).filter((lang) => lang === value);
        
        if(validate.length === 1) {     
            setFuncLanguage(value);
        }
    };

    const onFunctionReturnTypeChange = evt => {
        const value = evt.target.value;
        
        // check if 'value' is valid language
        const validate = Object.keys(FUNCTION_RETURN_TYPES).filter((lang) => lang === value);
        
        if(validate.length === 1) {
            setFuncReturnType(FUNCTION_RETURN_TYPES[value]);
        }
    };
    
    return (
        <div className={classes.verticalContainer}>
            <div className={classes.titleContainer}>
            </div>
            <div className={classes.bodyContainer}>
                <div className={classes.bodyWrapper}>
                    <div className={classes.root}>
                        {/* header */}
                        <div className={classes.colFlex}>
                            <div className={classes.colFlex3} style={{}}>
                                <SimpleTextField label={"Function name"} 
                                                 value={funcName}
                                                 onChange={onFunctionNameChange}/>
                            </div>
                            <div className={classes.colFlex1}>
                                <CustomSelect label={'Language'}
                                              checkedOptionIndex={(() => 1 + getKeyIndexByValue(PROGRAMMING_LANGUAGES, funcLanguage))()}
                                              options={(() => Object.keys(PROGRAMMING_LANGUAGES))()}  
                                              onChange={onFunctionLanguageChange}/>
                            </div>
                            <div className={classes.colFlex1}>
                                <CustomSelect label={'Return type'} 
                                              checkedOptionIndex={(() => 1 + getKeyIndexByValue(FUNCTION_RETURN_TYPES, functReturnType))()}
                                              options={(() => Object.keys(FUNCTION_RETURN_TYPES))()}  
                                              onChange={onFunctionReturnTypeChange}/>
                            </div>
                        </div>

                        {/* parameters */}
                        <div className={classes.section}>
                            <div className={classes.titleContainer}>
                                    <span className={classes.title}>Parameters</span>
                            </div>
                            <div className={classes.listContainer}>
                                <ParameterInputList inputs={funcParameters}
                                                    onParameterInputChange={onParameterInputListChange} />
                            </div>
                        </div>

                        {/* solution preview */}
                        <div className={classes.section}>
                            <div className={classes.titleContainer}>
                                    <span className={classes.title}>Solution</span>
                            </div>
                            <CodeEditor code={funcSolutionCode} 
                                        setCode={setFuncSolutionCode}
                                        codemirror={codemirror}
                                        textareaNode={textareaNode}
                                        mode={funcLanguage}
                            />
                        </div>
                    
                    </div>
                </div>
            </div>
        </div>
        
);

}

SolutionSubpage.propTypes = {
    funcName: PropTypes.string,
    funcLanguage: PropTypes.string,
    functReturnType: PropTypes.string,
    funcParameters: PropTypes.array,
    // callbacks
    onPageChange: PropTypes.func.isRequired,
}

SolutionSubpage.defaultProps = {
    funcName: '',
    funcLanguage: PROGRAMMING_LANGUAGES.JAVA,
    functReturnType: FUNCTION_RETURN_TYPES.INT,
    funcParameters: [],
}

const mapStateToProps = ({ solution }, props) => {
    return {
        solution,
        ...props
    };
};
  
export default ConnectTo(mapStateToProps)(SolutionSubpage);