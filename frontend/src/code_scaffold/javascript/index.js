const questionTypes = require('../../utils/questionTypes.js');

function CodeScaffolding(entries, userSolution, hiddenSolution, questionType)
{
    let CodeScaffolding;
    switch(questionType){
        case questionTypes.String:
            return stringScaffold(entries,userSolution,hiddenSolution);
        case questionTypes.Array:
            return arrayScaffold(entries,userSolution,hiddenSolution);
        case questionTypes.Integer:
            return integerScaffold(entries,userSolution,hiddenSolution);
    }

}


const arrayScaffold = (entries, userSolution, hiddenSolution) =>
` /*---------------ENTRIES---------------*/
const convertedEntries = ${JSON.stringify(entries)};
var userSolution = ${userSolution};
var hiddenSolution = ${hiddenSolution};
var gotRightAmount = 0;
for(var i=0;i<convertedEntries.length;i++)
{

    let entry = convertedEntries[i];
    var result = userSolution(entry);
    var hiddenResult = hiddenSolution(entry);
    console.log("case "+i+": "+result+":"+hiddenResult);
    if (result === hiddenResult)
    {
        gotRightAmount++;
    }
}

console.log('Accepted ! Cases passed: '+gotRightAmount+ '/'+convertedEntries.length);`;

const integerScaffold = (entries, userSolution, hiddenSolution) =>
` /*---------------ENTRIES---------------*/
const convertedEntries = ${JSON.stringify(entries)};
var userSolution = ${userSolution};
var hiddenSolution = ${hiddenSolution};
var gotRightAmount = 0;
for(var i=0;i<convertedEntries.length;i++)
{

    let entry = convertedEntries[i];
    var result = userSolution(entry);
    var hiddenResult = hiddenSolution(entry);
    console.log("case "+i+": "+result+":"+hiddenResult);
    if (result === hiddenResult)
    {
        gotRightAmount++;
    }
}

console.log('Accepted ! Cases passed: '+gotRightAmount+ '/'+convertedEntries.length);`;

const stringScaffold = (entries, userSolution, hiddenSolution) =>
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

console.log('Accepted ! Cases passed: '+gotRightAmount+ '/'+entries.length);`;


module.exports = CodeScaffolding