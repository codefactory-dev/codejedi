const questionTypes = require('../../utils/questionTypes.js');

function CodeScaffolding(entries, paramsAmount, userSolution, hiddenSolution,questionType, entryFunction="solution")
{
    let CodeScaffolding;
    return arrayScaffold(entries,paramsAmount, userSolution,hiddenSolution,entryFunction);
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
const arrayScaffold = (entries, paramsAmount, userSolution, hiddenSolution,entryFunction) => {

    let convertedEntries;
    if (paramsAmount > 1){
        convertedEntries = `${ entries.length > 0 ? JSON.stringify(entries).replace(/"([^"]*)"/g, '[$1]') : '[]'}`
    } else {
        convertedEntries = `${ entries.length > 0 ? JSON.stringify(entries) : '[]'}` 
    }

    let userSolutionExecution;
    if (paramsAmount > 1){
        userSolutionExecution = `userSolution.apply(null,entry)`
    } else {
        userSolutionExecution = `userSolution(entry)` 
    }

    let hiddenSolutionExecution;
    if (paramsAmount > 1){
        hiddenSolutionExecution = `hiddenSolution.apply(null,entry)`
    } else {
        hiddenSolutionExecution = `hiddenSolution(entry)` 
    }


    return ` /*---------------ENTRIES---------------*/
            const convertedEntries = ${convertedEntries};
            ${userSolution.replace(entryFunction, 'userSolution')}
            ${hiddenSolution.replace(entryFunction, 'hiddenSolution')}
            var gotRightAmount = 0;
            for(var i=0;i<convertedEntries.length;i++)
            {
            
                let entry = convertedEntries[i];
                var result = ${userSolutionExecution};
                var hiddenResult = ${hiddenSolutionExecution};
                console.log("case "+i+": "+JSON.stringify(result)+":"+JSON.stringify(hiddenResult));
                if (JSON.stringify(result) === JSON.stringify(hiddenResult))
                {
                    gotRightAmount++;
                }
            }
            
            console.log('Accepted ! Cases passed: '+gotRightAmount+ '/'+convertedEntries.length);`;
}


const integerScaffold = (entries, paramsAmount, userSolution, hiddenSolution, entryFunction) =>
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

const stringScaffold = (entries, paramsAmount, userSolution, hiddenSolution, entryFunction) =>
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