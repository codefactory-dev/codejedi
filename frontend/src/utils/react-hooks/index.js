import React, { useEffect, useRef } from 'react';

export const useDidMountEffect = (func, array) => {
    const didMount = useRef(false);

    useEffect(() => {
        if (didMount.current) func();
        else didMount.current = true;
    }, array);
}