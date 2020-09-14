function ParseString(text)
{
    var array = text.split("\n");
    console.log("stringified array: "+JSON.stringify(array));
    array.forEach(str => {
        console.log("str[0] = "+str[0]);
        if (str[0] !== `\"` || str[1] !== `\"`)
        {
            throw new Error("Inputs should be strings separated by line breaks.");
        }
    });
    return array;
}
function ParseInt(text)
{
    var array = text.split("\n");
    var res = [];
    array.forEach(num => {
        var parsed = ParseInt(num);
        if (parsed === NaN)
        {
            throw new Error("Inputs should be strings separated by line breaks.");
        }
        res.push(parsed);
    });
    return res;
}

function ParseArray(text)
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
            ans.push(temp);
            temp = [];
            i = k+2;
        }
    }
    return ans;
}
function nextOp(str,index){
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
module.exports = {
    ParseArray,
    ParseInt,
    ParseString
}