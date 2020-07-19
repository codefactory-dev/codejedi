import React, { useState, useEffect } from 'react';
import axios from 'axios';

import './Editor.css';

function EditorTestcases({editorValue, setEditorValue}) { 
    function handleChange(event){
        console.log(event.target.value);
        setEditorValue(event.target.value);
    }
    return(
        <textarea value={editorValue} onChange={handleChange} />
    )
 
}

export default EditorTestcases;