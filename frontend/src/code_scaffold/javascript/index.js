const questionTypes = require('../../utils/questionTypes.js');

function CodeScaffolding(entries, userSolution, hiddenSolution,questionType, entryFunction="solution")
{
    let CodeScaffolding;
    return arrayScaffold(entries,userSolution,hiddenSolution,entryFunction);
    /*
    switch(questionType){
        case questionTypes.String:
            return stringScaffold(entries,userSolution,hiddenSolution,entryFunction);
        case questionTypes.Array:
            return arrayScaffold(entries,userSolution,hiddenSolution,entryFunction);
        case questionTypes.Integer:
            return integerScaffold(entries,userSolution,hiddenSolution,entryFunction);
    }
    */

}

//The "([^"]*)" regex captures a ", followed by 0 or more things that aren't another ", and a closing ".
//The replacement uses $1 as a reference for the things that were wrapped in quotes
const arrayScaffold = (entries, userSolution, hiddenSolution,entryFunction) =>
` /*---------------ENTRIES---------------*/
const convertedEntries = ${ entries.length > 0 ? entries.replace(/"([^"]*)"/g, '[$1]') : '[]'};
${userSolution.replace(entryFunction, 'userSolution')}
${hiddenSolution.replace(entryFunction, 'hiddenSolution')}
var gotRightAmount = 0;
for(var i=0;i<convertedEntries.length;i++)
{

    let entry = convertedEntries[i];
    var result = userSolution(entry);
    var hiddenResult = hiddenSolution.apply(null,entry);
    console.log("case "+i+": "+result+":"+hiddenResult);
    if (JSON.stringify(result) === JSON.stringify(hiddenResult))
    {
        gotRightAmount++;
    }
}

console.log('Accepted ! Cases passed: '+gotRightAmount+ '/'+convertedEntries.length);`;

const integerScaffold = (entries, userSolution, hiddenSolution, entryFunction) =>
` /*---------------ENTRIES---------------*/
const convertedEntries = ${JSON.stringify(entries)};
var userSolution = function(argument){
    ${userSolution}
    return ${entryFunction}(argument);
};
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

const stringScaffold = (entries, userSolution, hiddenSolution, entryFunction) =>
` /*---------------ENTRIES---------------*/
const entries = ${JSON.stringify(entries)};
var userSolution = function(argument){
    ${userSolution}
    return ${entryFunction}(argument);
};
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