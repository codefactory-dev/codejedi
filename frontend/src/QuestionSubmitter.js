import React, {useState} from 'react'
import CodeEditor from './CodeEditor.js'
import EditorTestcases from './EditorTestcases.js';
import axios from 'axios'

function QuestionSubmitter()
{
    const [code, setCode] = useState('');
    const [editors, setEditors] = useState(null);
    function submitAll()
    {
        
        //get question from somewhere
        var questionText = code;
        
        //get test cases from file

        var testCasesText = editors;

        //insert test cases into question
        var togetherText = questionText;
        togetherText+='\n\n';
        togetherText+=testCasesText;

        console.log("===========TOGETHER TEXT===========");
        console.log(togetherText);

        //transform question into a "sendable" one-line string for json
        var oneLiner = "";
        createEditor();

        // POST both the question and the test cases
        async function createEditor() {
            const result = await axios.post('/compile', {code: oneLiner});
            setEditors([...editors, result.data.description]);
        }
    }
    return (
        <>
            <CodeEditor code={code} setCode={setCode} />
            <br/>
            <br/>
            <br/>
            <EditorTestcases editors={editors} setEditors={setEditors} />
            <button onClick={submitAll}> SUBMIT ALL </button>
        </>
    )

}

export default QuestionSubmitter