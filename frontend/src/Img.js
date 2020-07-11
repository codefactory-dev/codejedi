import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Img() { 
    const [imgs, setImgs] = useState(null);

    useEffect(()=> {
        // GET request
        async function getImgs() {
            const fetchImgs = await axios.get('/profilepics'); 
        
            if (fetchImgs) {
                // console.log(fetchImgs.data); 
                setImgs(fetchImgs.data);
            }
        }
        
        getImgs();
    }, []);

    // --------------------------------------------------------------------
    // RENDERING
    // --------------------------------------------------------------------

    const renderImgs = () => {
        return (
            imgs.map((img, idx) => <img key={idx} src={`data(${img})`} />)
        );
    };

    return (
        <React.Fragment>
            <form action="/profilepics" encType="multipart/form-data" method="POST"> 
                    <input type="file" name="profilepic" />
                    <input type="submit" value="Upload a file"/>
            </form>
            {imgs ? renderImgs() : undefined}
        </React.Fragment>
    );

};

export default Img;