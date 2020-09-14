import React, { useState, useEffect } from 'react';
import axios from 'axios';

import './EditorTestcases.scss';

function EditorTestcases({editorValue, setEditorValue, width, height}) { 
    function handleChange(event){
        console.log(event.target.value);
        setEditorValue(event.target.value);
    }
    return(
        <textarea style={{width,height}} id="editor-testcases" value={editorValue} onChange={handleChange} />
    )
 
}

export default EditorTestcases;