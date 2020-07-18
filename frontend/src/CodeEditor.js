import React, { useRef, useState, useEffect } from 'react';
import javascript from 'codemirror/mode/javascript/javascript';
import clike from 'codemirror/mode/clike/clike';
import CodeMirror from 'codemirror';
import axios from 'axios';

import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/monokai.css';
import './CodeEditor.css';



function CodeEditor({code, setCode}) { 
    const textareaNode = useRef();
    const languageModes = new Map([['javascript', 'javascript'], ['java', 'text/x-java'], ['c++', 'text/x-c++src']]);
    let selectedLanguage = 'java';

    let codemirror = null;
    useEffect(()=> {
        codemirror = CodeMirror.fromTextArea(textareaNode.current, {
            lineNumbers: true,
            mode: `${languageModes.get(selectedLanguage)}`,
            matchBrackets: true
        });
        codemirror.focus();
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
    function handleChange(event) {
        this.setState({code: event.target.value});
    }

    // --------------------------------------------------------------------
    // RENDERING
    // --------------------------------------------------------------------

    return (
        <div className={'codemirrorContainer'}>
            <textarea
					ref={textareaNode}
                    autoComplete="off"
                    value={code}
                    onChange={handleChange}
			/>
            <button onClick={handleBtnClick}>Save</button>
        </div>
        
    );

}

export default CodeEditor;