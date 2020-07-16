import React, { useState } from 'react';
import axios from 'axios';

function Img() { 
    const [img, setImg] = useState('');
    let imgFile = undefined;


    const handleSubmit = evt => {
        evt.preventDefault();
        uploadImage();
        
        function _imageEncode (arrayBuffer) {
            let u8 = new Uint8Array(arrayBuffer)
            let b64encoded = btoa([].reduce.call(new Uint8Array(arrayBuffer),function(p,c){return p+String.fromCharCode(c)},''))
            let mimetype="image/png"
            return "data:"+mimetype+";base64,"+b64encoded
        }

        async function uploadImage() {
            const data = new FormData();
            data.append('file', imgFile);
            data.append('filename', imgFile.name);

            // POST request
            const netlifyURL = '/.netlify/functions/server/api/upload';
            const localURL = 'http://localhost:3000/upload';
            const postURL = localURL;
            const result = await axios.post(postURL, data, {
                                            headers: { 'Content-Type': 'multipart/form-data'},
                                            responseType: 'arraybuffer'
            });

            console.log(result);
            const url = _imageEncode(result.data);
            console.log(url);
            setImg(url);
        }
    }

    // --------------------------------------------------------------------
    // RENDERING
    // --------------------------------------------------------------------
   
    return (
        <React.Fragment>
            <form encType="multipart/form-data" onSubmit={handleSubmit}> 
                    <input type="file" name="avatar" onChange={e => imgFile = e.target.files[0]}/>
                    <input type="submit" value="Upload a file"/>
            </form>
            {img ? <img src={img} width="128" height="128"/> : undefined}
        </React.Fragment>
    );
};

export default Img;