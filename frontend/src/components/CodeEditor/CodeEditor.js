import React, { useRef, useState, useEffect } from 'react';
import javascript from 'codemirror/mode/javascript/javascript';
import clike from 'codemirror/mode/clike/clike';
import CodeMirror from 'codemirror';
import PropTypes from 'prop-types';
import axios from 'axios';

import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/monokai.css';
import './CodeEditor.scss';


// @code - default HTML-based code to be loaded in codeEditor as soon as it first renders
// @setCode - ?
// @height - code editor's height  
// @loadedCode - boolean - state variable used to reload the code in code mirror
function CodeEditor(props) { 
    const codemirror = useRef(null);
    const textareaNode = useRef();
    
    const languageModes = new Map([['javascript', 'javascript'], ['java', 'text/x-java'], ['c++', 'text/x-c++src']]);
    let selectedLanguage = 'java';

    // set codemirror default configs + code
    useEffect(() => {
        codemirror.current = CodeMirror.fromTextArea(textareaNode.current, {
            lineNumbers: true,
            mode: `${languageModes.get(selectedLanguage)}`,
            matchBrackets: true
        });
        
        codemirror.current.on("change", changeObj => {    
            // console.log("property names: "+ Object.getOwnPropertyNames(changeObj));
            // console.log("QUESTION CODE: "+changeObj.doc.getValue());
            handleChange(changeObj)
        });
        
        if (props.code) {
            textareaNode.current.innerHTML = props.code;
        }
        // codemirror.current.focus();

    }, []);


    useEffect(() => {    
            console.log("codemirror updated");
    
            console.log("loadedCode: "+props.loadedCode);
            console.log("code: "+props.code);
            
            if (props.code)
                codemirror.current.setValue(props.code);
            // textareaNode.current.innerHTML = code;
        
        
    }, [props.loadedCode]);

    // --------------------------------------------------------------------
    // HANDLERS
    // --------------------------------------------------------------------

    /*
    const handleBtnClick = evt => {
        createCode();

        // POST request
        async function createCode() {
            const result = await axios.post('/.netlify/functions/server/api/codes', {mode: codemirror.current.doc.modeOption, text: codemirror.current.doc.getValue()});

            // console.log(result);
            codemirror.current.setOption('mode', result.data.mode);
            codemirror.current.setValue(result.data.text);
            codemirror.current.setOption('readOnly', 'nocursor');
            console.log("HI");
            setCode(result.data);
        }
    }
    */

    function handleChange(changeObj) {    
        // props.setCode(changeObj.doc.getValue());
    }

    // --------------------------------------------------------------------
    // RENDERING
    // --------------------------------------------------------------------

    return (
        <div style= {{width:'100%', height: props.height}} className={'codemirrorContainer'}>
            <textarea
					ref={textareaNode}
                    autoComplete="off"
			/>
            {/*<button onClick={handleBtnClick}>Save</button>*/}
        </div>
        
    );

}

CodeEditor.propTypes = {
    code: PropTypes.string,
    setCode:  PropTypes.func,
    height: PropTypes.number,
    loadedCode: PropTypes.bool,
    onChange: PropTypes.func
}

export default CodeEditor;