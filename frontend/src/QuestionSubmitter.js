import React, {useState} from 'react'
import CodeEditor from './CodeEditor.js'
import EditorTestcases from './EditorTestcases';
import api from 'services/api'
import { ConvertCodeToOneLiner } from './utils/TextReadingUtils'
import { CodeScaffolding } from './utils/CodeScaffolding'
import Parse from './utils/Parser'

function QuestionSubmitter()
{
    const [code, setCode] = useState('');
    const [editorValue, setEditorValue] = useState();
    const [answer, setAnswer] = useState();
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
        togetherText+=CodeScaffolding(structure);

        console.log("---TOGETHER TEXT---");
        console.log(togetherText);

        //transform question into a "sendable" one-line string for json
        var oneLiner = ConvertCodeToOneLiner(togetherText);
        console.log("---ONE LINER---");
        console.log(oneLiner);


        createEditor();

        // POST both the question and the test cases
        async function createEditor() {
            
            const result = await api({
                method: 'post',
                url: '/compile',
                data: { 
                    code:oneLiner
                }
            });            
            console.log(Object.getOwnPropertyNames(result))
            const {stdout, stderr, error} = result.data;
            console.log("stdout: "+stdout+", stderr: "+stderr+", error: "+error);
            if (stderr || error)
            {
                return setAnswer(stderr +' '+ error)
            }
            return setAnswer(stdout);
        }
    }
    return (
        <>
            <CodeEditor code={code} setCode={setCode} />
            <EditorTestcases editorValue={editorValue} setEditorValue={setEditorValue} />
            <div>
                <button onClick={submitAll}> SUBMIT ALL </button>
            </div>
            {
                answer ?
                <h2 style={{color:'green'}}>
                    {answer}
                </h2>
                :
                <h2 style={{color:'red'}}>
                    {answer}
                </h2>
            }
            
        </>
    )

}

export default QuestionSubmitter