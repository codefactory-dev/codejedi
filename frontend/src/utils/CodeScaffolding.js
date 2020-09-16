

function CodeScaffolding(entries, userSolution, hiddenSolution)
{
    var CodeScaffolding = 
` /*---------------ENTRIES---------------*/
var entries = ${JSON.stringify(entries)};
var userSolution = ${userSolution};
var hiddenSolution = ${hiddenSolution};
var gotRightAmount = 0;
for(var i=0;i<entries.length;i++)
{
    var result = userSolution(entries[i]);
    if (result === hiddenSolution(entries[i]))
    {
        gotRightAmount++;
    }
}

console.log('Accepted ! Cases passed: '+gotRightAmount+ '/'+entries.length);`
    return CodeScaffolding;
}


module.exports = CodeScaffolding