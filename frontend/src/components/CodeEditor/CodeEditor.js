import React, { useRef, useState, useEffect } from 'react';

import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/monokai.css';

const CodeEditor = ({textareaNode, ...props}) => {

    return (
        <div style= {{width:'100%', height: props.height}} className={'codemirrorContainer'}>
            <textarea
					ref={textareaNode}
                    autoComplete="off"
			/>
        </div>
        
    );

}

export default CodeEditor;