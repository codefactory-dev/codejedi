import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

function Img() { 
    const [img, setImg] = useState('');
    let imgFile = undefined;

    useEffect(()=> {
        // GET request
        async function getImgs() {
            const fetchImgs = await axios.get('/.netlify/functions/server/api/profilepics'); 
        
            if (fetchImgs) {
                // TODO
            }
        }
    }, []);

    const arrayBufferToBase64 = (buffer) => {
        var binary = '';
        var bytes = [].slice.call(new Uint8Array(buffer));
        bytes.forEach((b) => binary += String.fromCharCode(b));
        return window.btoa(binary);
    };

    const handleSubmit = evt => {
        evt.preventDefault();
        uploadImage();

        async function uploadImage() {
            var formData = new FormData();

            formData.append('profilepic', imgFile);
            //console.log('>> formData >> ', formData);

            const result = await axios.post('/.netlify/functions/server/api/profilepics', formData, {
                                                    headers: { 'Content-Type': 'multipart/form-data'} });

            // console.log(result.data);
            // console.log(arrayBufferToBase64(result.data.buffer.data))
            let im = 'data:image/jpeg;base64,' + result.data.postImgBase64;
            setImg(im);
        }
    }

    // --------------------------------------------------------------------
    // RENDERING
    // --------------------------------------------------------------------

    return (
        <React.Fragment>
            <form encType="multipart/form-data" onSubmit={handleSubmit}> 
                    <input type="file" name="profilepic" onChange={e => imgFile = e.target.files.files[0]}/>
                    <input type="submit" value="Upload a file"/>
            </form>
            {img ? <img
                    src={img}
                    alt='Helpful alt text'/> : undefined}
        </React.Fragment>
    );
};

export default Img;