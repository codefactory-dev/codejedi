const questionTypes = require('./questionTypes.js');

function CodeScaffolding(entries, userSolution, hiddenSolution, questionType)
{
    let CodeScaffolding;
    switch(questionType){
        case questionTypes.String:
            CodeScaffolding = 
` /*---------------ENTRIES---------------*/
const entries = ${JSON.stringify(entries)};
var userSolution = ${userSolution};
var hiddenSolution = ${hiddenSolution};
var gotRightAmount = 0;
for(var i=0;i<entries.length;i++)
{

    let entry = entries[i].substring(1,entries[i].length-1);
    var result = userSolution(entry);
    var hiddenResult = hiddenSolution(entry);
    console.log("case "+i+": "+result+":"+hiddenResult);
    if (result === hiddenResult)
    {
        gotRightAmount++;
    }
}

console.log('Accepted ! Cases passed: '+gotRightAmount+ '/'+entries.length);`
            return CodeScaffolding;
        case questionTypes.Array:
            CodeScaffolding = 
` /*---------------ENTRIES---------------*/
const convertedEntries = ${JSON.stringify(entries)};
console.log("these are the entries: "+convertedEntries);
var userSolution = ${userSolution};
var hiddenSolution = ${hiddenSolution};
var gotRightAmount = 0;
for(var i=0;i<convertedEntries.length;i++)
{

    let entry = convertedEntries[i].substring(1,convertedEntries[i].length-1);
    var result = userSolution(entry);
    var hiddenResult = hiddenSolution(entry);
    console.log("case "+i+": "+result+":"+hiddenResult);
    if (result === hiddenResult)
    {
        gotRightAmount++;
    }
}

console.log('Accepted ! Cases passed: '+gotRightAmount+ '/'+convertedEntries.length);`
            return CodeScaffolding;
    }

}


module.exports = CodeScaffolding