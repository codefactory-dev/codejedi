function Parse(text)
{
    var ans = [];
    var i = 0;
    var len = text.length;
    while(i<text.length)
    {
        var {op,k} = nextOp();
        if (op === "comma")
        {
            var input = JSON.parse(str.substring(i+1,k+1));
            ans.push(input);
            i = k;
        }
        else if (op === "close")
        {
            i = k+2;
        }
    }
    return ans;
}
function nextOp(str,index){
    while(str.charAt(index+1) !== ',' && str.charAt(index+1) !== ']')
    {
        index++;
    }
    var op;
    if (str.charAt(index+1) === ',')
    {
        op = "comma";
    }
    else if (str.charAt(index+1) === ']')
    {
        op = "close";
    }
    return {op:op, k:index+1};
}
module.exports = Parse