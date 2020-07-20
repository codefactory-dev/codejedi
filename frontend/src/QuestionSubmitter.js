import React, {useState} from 'react'
import CodeEditor from './CodeEditor.js'
import EditorTestcases from './EditorTestcases';
import axios from 'axios'
import { ConvertCodeToOneLiner } from './utils/TextReadingUtils'
import Parse from './utils/Parser'

function QuestionSubmitter()
{
    const [code, setCode] = useState('');
    const [editorValue, setEditorValue] = useState();
    function submitAll()
    {
        
        //get question from somewhere
        var questionText = code;
        
        //get test cases from file

        var testCasesText = editorValue;

        //parse test cases into javascript
        var structure = Parse(testCasesText);
        console.log("---PARSED STRUCTURE---");
        console.log(structure);

        //insert test cases into question
        var togetherText = questionText;
        togetherText+='\n\n';
        togetherText+=JSON.stringify(structure);

        console.log("---TOGETHER TEXT---");
        console.log(togetherText);

        //transform question into a "sendable" one-line string for json
        var oneLiner = ConvertCodeToOneLiner(togetherText);
        console.log("---ONE LINER---");
        console.log(oneLiner);


        createEditor();

        // POST both the question and the test cases
        async function createEditor() {
            const result = await axios.post('/compile', {code: oneLiner});
        }
    }
    return (
        <>
            <CodeEditor code={code} setCode={setCode} />
            <EditorTestcases editorValue={editorValue} setEditorValue={setEditorValue} />
            <div>
                <button onClick={submitAll}> SUBMIT ALL </button>
            </div>
        </>
    )

}

export default QuestionSubmitter