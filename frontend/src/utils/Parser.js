import ParseError from 'Errors/ParseError'
const questionTypes = require('./questionTypes.js');

export function Parse(text, parseType)
{
    try {
        switch(parseType){
            case questionTypes.Array: 
                return ParseArray(text);
            case questionTypes.String:
                return ParseString(text);
            case questionTypes.Integer:
                return ParseInteger(text);
        }
    } catch(error) {
        throw new ParseError('Error parsing your testcases. '+error)
    }
}

export function ParseString(text)
{
    return text;
    /*
    var array = text.split("\n");
    array.forEach(str => {
        var cond1 = str.substring(0,1) !== "\"";
        var cond2 = str.substring(str.length-1,str.length) !== "\"";
        if ( cond1 || cond2 )
        {
            throw new Error("Testcases should be strings separated by line breaks.");
        }
    });
    return array;
    */
}
export function ParseInteger(text)
{
    var array = text.split("\n");
    var res = [];
    array.forEach(num => {
        var parsed = parseInt(num);
        if (parsed === NaN)
        {
            throw new Error("Inputs should be strings separated by line breaks.");
        }
        res.push(parsed);
    });
    return res;
}

function ParseArray(text){
    if (!text) return [];
    //split on a comma that is between quotes. The comma can have any number
    //of whitespaces before or after. (\s means whitespace)
    var array = text.match(/".*"/g);
    //(?<="), ---> this is the "positive look behind operator", it checks if 
    //the comma is preceded by " (double quotes)
    var splitArray = array[0].split(/(?<="),/);
    console.log("THIS IS THE SPLIT ARRAY: "+splitArray);
    for(let i=0;i<splitArray.length;i++){
        splitArray[i] = splitArray[i].replace(/"/g,"");
    }
    console.log("THIS IS THE SPLIT ARRAY AFTER: "+splitArray);
    // if (array.length === 1 && array[0] === '[]'){
    //     return [];
    // }
    //array[0] = array[0].replace(/"/,"");
    //array[array.length - 1] = array[array.length - 1].replace(/"/,"")
    
    //---------finished reading array
    var res = [];
    let cont=0;
    splitArray.forEach(elem => {
        try {
            let converted = JSON.parse(elem);
            res.push(converted);
        } catch(error) {
            try {
                //let's test if it's multiple parameters
                let enclosedInArray = '[' + elem + ']';
                let secondTryConvert = JSON.parse(enclosedInArray)
                res.push(secondTryConvert);
            } catch(error) {
                //let's see if it's a string
                try {
                    let enclosedInQuotes = '"' + elem + '"';
                    let thirdTryConvert = JSON.parse(enclosedInQuotes)
                    res.push(thirdTryConvert);
                } catch (error){
                    throw new Error('Error parsing an array content.');
                }
            }
        }
    });
    console.log("returning parsed array: "+JSON.stringify(res));
    return res;
}

export function ParseSingleArray(text)
{
    var ans = [];
    var i = 0;
    var len = text.length;
    var temp = [];
    while(i<len)
    {
        var {op,k} = nextOp(text,i);
        
        if (op === "comma")
        {
            var input = JSON.parse(text.substring(i+1,k));
            temp.push(input);
            i = k;
        }
        else if (op === "close")
        {
            var input = JSON.parse(text.substring(i+1,k));
            temp.push(input);
            ans.push(...temp);
            temp = [];
            i = k+2;
        }
    }
    return ans;
}
export function nextOp(str,index){
    index++;
    while(str.charAt(index) !== ',' && str.charAt(index) !== ']')
    {
        index++;
    }
    var op;
    if (str.charAt(index) === ',')
    {
        op = "comma";
    }
    else if (str.charAt(index) === ']')
    {
        op = "close";
    }
    return {op:op, k:index};
}