const questionTypes = require('./questionTypes.js');

export function Parse(text, parseType)
{
    switch(parseType){
        case questionTypes.Array: 
            return ParseArray(text);
        case questionTypes.String:
            return ParseString(text);
        case questionTypes.Integer:
            return ParseInteger(text);
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
    var array = text.split("\n");
    console.log("THIS IS THE ARRAY: "+array);
    var res = [];
    let cont=0;
    array.forEach(elem => {
        var cond1 = elem.substring(0,1) !== "[";
        var cond2 = elem.substring(elem.length-1,elem.length) !== "]";
        if ( cond1 || cond2 )
        {
            throw new Error("Testcases should be arrays separated by line breaks.");
        }
        let parsed;
        try{
            parsed = ParseSingleArray(elem);
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