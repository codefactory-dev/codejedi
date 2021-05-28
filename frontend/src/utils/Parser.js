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

export function ParseArray(text){
    
    //split on a comma that is between quotes. The comma can have any number
    //of whitespaces before or after. (\s means whitespace)
    var array = text.slice(1,-1).split(/"\s*,\s*"/g);
    console.log("THIS IS THE ARRAY: "+array);
    if (array.length === 1 && array[0] === '[]'){
        return [];
    }
    array[0] = array[0].replace(/"/,"");
    array[array.length - 1] = array[array.length - 1].replace(/"/,"")
    //---------finished reading array
    var res = [];
    let cont=0;
    array.forEach(elem => {
        let parsed;
        try{
            parsed = JSON.parse(elem);
        } catch(e){
            throw new Error("Error parsing an array content.");
        }
        console.log("parsed "+(cont++)+": "+parsed);
        res.push(parsed);
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