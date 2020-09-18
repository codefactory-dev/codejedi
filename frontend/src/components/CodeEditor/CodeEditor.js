import React, { useRef, useState, useEffect } from 'react';
import javascript from 'codemirror/mode/javascript/javascript';
import clike from 'codemirror/mode/clike/clike';
import CodeMirror from 'codemirror';
import axios from 'axios';

import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/monokai.css';
import './CodeEditor.scss';



function CodeEditor({code, setCode, height, codemirror}) { 
    const textareaNode = useRef();
    const languageModes = new Map([['javascript', 'javascript'], ['java', 'text/x-java'], ['c++', 'text/x-c++src']]);
    let selectedLanguage = 'java';

    useEffect(()=> {
        console.log("codemirror updated");
        if (code) {
            textareaNode.current.innerHTML = code;
        }
        codemirror = CodeMirror.fromTextArea(textareaNode.current, {
            lineNumbers: true,
            mode: `${languageModes.get(selectedLanguage)}`,
            matchBrackets: true
        });
        codemirror.focus();
        codemirror.on("change",(changeObj)=>{    
            handleChange(changeObj)
        });
    }, []);

    // --------------------------------------------------------------------
    // HANDLERS
    // --------------------------------------------------------------------

    const handleBtnClick = evt => {
        createCode();

        // POST request
        async function createCode() {
            const result = await axios.post('/.netlify/functions/server/api/codes', {mode: codemirror.doc.modeOption, text: codemirror.doc.getValue()});

            // console.log(result);
            codemirror.setOption('mode', result.data.mode);
            codemirror.setValue(result.data.text);
            codemirror.setOption('readOnly', 'nocursor');
            setCode(result.data);
        }
    }
    function handleChange(changeObj) {
        console.log("QUESTION CODE: "+changeObj.doc.getValue());
        setCode(changeObj.doc.getValue());
    }

    // --------------------------------------------------------------------
    // RENDERING
    // --------------------------------------------------------------------

    return (
        <div style= {{width:'100%', height: height}} className={'codemirrorContainer'}>
            <textarea
					ref={textareaNode}
                    autoComplete="off"
			/>
            {/*<button onClick={handleBtnClick}>Save</button>*/}
        </div>
        
    );

}

export default CodeEditor;