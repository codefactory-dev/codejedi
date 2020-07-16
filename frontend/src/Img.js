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

    const handleSubmit = evt => {
        evt.preventDefault();
        uploadImage();
        
        async function uploadImage() {
            const data = new FormData();
            data.append('file', imgFile);
            data.append('filename', imgFile.name);

            // POST request
            // const netlifyURL = '/.netlify/functions/server/api/profilepics'
            const localURL = 'http://localhost:3000/upload';
            const result = await axios.post(localURL, data, {headers: { 'Content-Type': 'multipart/form-data'} });

            console.log(result);
            setImg(`http://localhost:4000/${result.data.file}`);
        }
    }

    // --------------------------------------------------------------------
    // RENDERING
    // --------------------------------------------------------------------
   
    return (
        <React.Fragment>
            <form encType="multipart/form-data" onSubmit={handleSubmit}> 
                    <input type="file" name="profilepic" onChange={e => imgFile = e.target.files[0]}/>
                    <input type="submit" value="Upload a file"/>
            </form>
            {img ? <img
                    src={img}
                    width="128" height="128"/> : undefined}
        </React.Fragment>
    );
};

export default Img;