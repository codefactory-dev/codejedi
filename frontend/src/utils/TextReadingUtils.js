require('dotenv').config()
const axios = require('axios');
const util = require('util');
var fs = require('fs')

function readTextFileSync(filename)
{
    try {  
        var data = fs.readFileSync(filename, {encoding:'utf8'});
        return data.toString();    
    } catch(e) {
        console.log('Error:', e.stack);
    }
}
function appendToFileSync(filename,data)
{
    try{
        fs.appendFileSync(filename, data);
        return true;
    } catch(e) {
        console.log('Error:', e.stack);
    }
}
function ConvertCodeToOneLiner(code)
{
    console.log(JSON.stringify(code));
    return JSON.stringify(code);

}
/*
async function postToApi()
{
    
    const text = ConvertCodeToOneLiner();
    
    const body = {
        "files": [
            {
                "name": "main.js", 
                "content": text
            }
        ]
    }
    const payload = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Token '+process.env.GLOT_IO_TOKEN
    }
    console.log("these are the headers: ");
    for (key in payload.keys()){
        console.log( key + ": " + payload[key]);
    }
    try{
        const result = await axios({
            method: 'post',
            url: 'https://run.glot.io/languages/javascript/latest',
            data: body,
            headers: payload
        });
        console.log(result);
    } catch(e){
        console.log("error "+e);
    }
}
*/

module.exports = {
    readTextFileSync,
    appendToFileSync,
    ConvertCodeToOneLiner
}