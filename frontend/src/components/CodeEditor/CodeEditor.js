import React, { useRef, useState, useEffect } from 'react';
import javascript from 'codemirror/mode/javascript/javascript';
import clike from 'codemirror/mode/clike/clike';
import CodeMirror from 'codemirror';
import axios from 'axios';

import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/monokai.css';
import './CodeEditor.scss';



function CodeEditor({code, setCode, height, loadedCode}) { 
    const codemirror = useRef(null);
    const [firstTime, setFirstTime] = useState(false);
    const textareaNode = useRef();
    const languageModes = new Map([['javascript', 'javascript'], ['java', 'text/x-java'], ['c++', 'text/x-c++src']]);
    let selectedLanguage = 'java';

    useEffect(()=> {
        if (!firstTime) {
            console.log("codemirror updated");
            if (code) {
                textareaNode.current.innerHTML = code;
            }
            codemirror.current = CodeMirror.fromTextArea(textareaNode.current, {
                lineNumbers: true,
                mode: `${languageModes.get(selectedLanguage)}`,
                matchBrackets: true
            });
            codemirror.current.focus();
            codemirror.current.on("change",(changeObj)=>{    
                //console.log("property names: "+Object.getOwnPropertyNames(changeObj));
                handleChange(changeObj)
            });
            setFirstTime(true)
        }
        else {
            if (loadedCode) {
                codemirror.current.setValue(code);
            }
        }
        
    }, [loadedCode]);

    // --------------------------------------------------------------------
    // HANDLERS
    // --------------------------------------------------------------------

    const handleBtnClick = evt => {
        createCode();

        // POST request
        async function createCode() {
            const result = await axios.post('/.netlify/functions/server/api/codes', {mode: codemirror.current.doc.modeOption, text: codemirror.current.doc.getValue()});

            // console.log(result);
            codemirror.current.setOption('mode', result.data.mode);
            codemirror.current.setValue(result.data.text);
            codemirror.current.setOption('readOnly', 'nocursor');
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