import React, { useState, useEffect } from 'react';
import axios from 'axios';

import './Editor.scss';

function Editor({editorValue, setEditorValue, width, height}) { 
    function handleChange(event){
        console.log(event.target.value);
        setEditorValue(event.target.value);
    }
    return(
        <textarea style={{width,height}} className="editor" value={editorValue} onChange={handleChange} readOnly/>
    )
 
}

export default Editor;