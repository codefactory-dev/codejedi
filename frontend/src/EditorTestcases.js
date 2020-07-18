import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { readTextFileSync } from './utils/TextReadingUtils.js'
const path = require('path')

import './Editor.css';

function EditorTestcases() { 
    const [editors, setEditors] = useState(null);
    let iFrameRef;

    useEffect(()=> {
        iFrameRef.contentWindow.document.designMode = 'On';
        getEditors();

        // GET request
        async function getEditors() {
            const fetchEditors = await axios.get('/editors'); 
        
            if (fetchEditors) { 
                setEditors(fetchEditors.data.map(editor => editor.description)); 
            }
        }   
    }, []);


    // --------------------------------------------------------------------
    // HELPERS
    // --------------------------------------------------------------------

    const renderiFrame = (content, idx) => {    
        const applyRef = ref => { 
            if (ref) {
                cleaniFrame(ref);
                ref.contentWindow.document.write(content); 
            }
        };

        const ifrm = <iframe key={idx} ref={ref => applyRef(ref)} />;
        return ifrm;
    }

    const cleaniFrame = (ref) => ref.contentWindow.document.body.innerHTML = '';

    // --------------------------------------------------------------------
    // HANDLERS
    // --------------------------------------------------------------------

    const handleButtonClick = e => {
        const txt = iFrameRef.contentWindow.document.body.outerHTML;
        //createEditor();
        cleaniFrame(iFrameRef);
        
        //get question from somewhere
        var questionText = readTextFileSync(path.join(__dirname,'./utils/test_codes/.code.txt'));
        
        //get test cases from file

        var testCasesText = readTextFileSync(path.join(__dirname,'./utils/test_codes/.testCases.txt'));

        //insert test cases into question
        var togetherText = questionText;
        togetherText+='\n\n';
        togetherText+=testCasesText;

        console.log("===========TOGETHER TEXT===========");
        console.log(togetherText);

        //transform question into a "sendable" one-line string for json
        var oneLiner;

        // POST both the question and the test cases
        async function createEditor() {
            const result = await axios.post('/compile', {code: oneLiner});
            setEditors([...editors, result.data.description]);
        }
    };

    const handleIconClick = cmd => iFrameRef.contentWindow.document.execCommand(cmd, false, null);

    // --------------------------------------------------------------------
    // RENDERING
    // --------------------------------------------------------------------

    return (
        <div className={"container"}>
            <div className={"iconContainer"}>
                <i className="fas fa-bold" onClick={() => handleIconClick('bold')}></i>
                <i className="fas fa-italic" onClick={() => handleIconClick('italic')}></i>
                <i className="fas fa-underline" onClick={() => handleIconClick('underline')}></i>
            </div>

            <iframe ref={ref => iFrameRef = ref} />
            <button onClick={handleButtonClick}>Save</button>

            <div className={"iframeContainer"}>
                <p>SAVED TEXTS:</p>
                { editors ? editors.map((editorContent, index) => renderiFrame(editorContent, index)) : undefined }
            </div>
        </div> 
    );

}

export default EditorTestcases;