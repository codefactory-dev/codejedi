import {useEffect} from 'react';


/**
 * useKeyPress
 * @param {string} key -- the name of the key to respond to
 * @param {function} action -- the action to perform on key press
 * 
 */

 export default function useKeyPress(key, action) {
     useEffect(() => {
        function onKeyUp(e) {
            if (e.key === key) { action(); }
        }

        window.addEventListener('keyup', onKeyUp);

        return () => window.removeEventListener('keyup', onKeyUp);
     });
 }