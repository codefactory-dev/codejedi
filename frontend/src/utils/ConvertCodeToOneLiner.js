require('dotenv').config()
const axios = require('axios');

function readTextFileSync()
{
    // Make sure we got a filename on the command line.
    if (process.argv.length < 3) {
        console.log('Usage: node ' + process.argv[1] + ' FILENAME');
        process.exit(1);
    }
    try {  
        var fs = require('fs')
        , filename = process.argv[2];
        var data = fs.readFileSync(filename, 'utf8');
        return data.toString();    
    } catch(e) {
        console.log('Error:', e.stack);
    }
}

function readTextFile()
{
    // Make sure we got a filename on the command line.
    if (process.argv.length < 3) {
        console.log('Usage: node ' + process.argv[1] + ' FILENAME');
        process.exit(1);
    }
    // Read the file and print its contents.
    var fs = require('fs')
        , filename = process.argv[2];
    fs.readFile(filename, 'utf8', function(err, data) {
        if (err) throw err;
        console.log('OK: ' + filename);
        console.log(data)
    });
}
function ConvertCodeToOneLiner()
{
    var text = readTextFileSync();
    //var convertedText = text.replace(/(?:\r\n|\r|\n)/g, '\n');
    console.log(JSON.stringify(text));
    return JSON.stringify(text);

}

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
    for (key in payload){
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
postToApi();
