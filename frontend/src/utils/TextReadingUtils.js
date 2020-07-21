require('dotenv').config()
const axios = require('axios');
const util = require('util');
var fs = require('fs')
var assert = require('assert');

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
function removeNewLine(val, replace)
{
    assert.equal(typeof val, 'string', 'newline-remove: val should be a string');
    return val.replace(/(\r\n|\n|\r)/gm, replace);
}
function ConvertCodeToOneLiner(code)
{
    var response = removeNewLine(code,' ')
    console.log(response);
    return response;

}

module.exports = {
    readTextFileSync,
    appendToFileSync,
    ConvertCodeToOneLiner
}