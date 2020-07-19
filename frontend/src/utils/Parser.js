function getNextCommaIndex(input, i)
{
    while(i<input.length)
    {
        if (input.charAt(i)!==',')
        {
            i++;
        }
        else
        {
            return i;
        }
    }
}
function processInput(input, i)
{
    if (input.split(0,3) === 'i:[')
    {
        
    }
}
function processOutput(input, i)
{
    if (input.split(0,3) === 'o:[')
    {

    }
}
function ParseArrays(input)
{
    var len = input.length;
    var ans = { 
        inputs: [],
        outputs: []
    };
    var i = 0;
    while(i<len)
    {
        inputs.push(processInput(input, i));
        outputs.push(processOutput(input, i));
    }

}

module.exports = Parse