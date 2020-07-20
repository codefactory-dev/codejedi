function Parse(text)
{
    var ans = [];
    var i = 0;
    var len = text.length;
    while(i<len)
    {
        console.log("i = "+i);
        var {op,k} = nextOp(text,i);
        console.log("op = "+op);
        console.log("k = "+k);
        
        if (op === "comma")
        {
            console.log("substring("+(i+1)+","+(k)+")");
            var input = JSON.parse(text.substring(i+1,k));
            console.log("pushing "+input);
            ans.push(input);
            i = k;
        }
        else if (op === "close")
        {
            var input = JSON.parse(text.substring(i+1,k));
            console.log("pushing "+input);
            ans.push(input);
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
module.exports = Parse