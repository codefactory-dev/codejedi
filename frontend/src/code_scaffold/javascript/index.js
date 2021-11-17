const questionTypes = require('../../utils/questionTypes.js');

function CodeScaffolding(
	entries,
	paramsAmount,
	userSolution,
	hiddenSolution,
	questionType,
	entryFunction = 'solution'
) {
	let convertedEntries;
	if (paramsAmount > 1) {
		convertedEntries = `${
			entries.length > 0
				? JSON.stringify(entries).replace(/"([^"]*)"/g, '[$1]')
				: '[]'
		}`;
	} else {
		convertedEntries = `${entries.length > 0 ? JSON.stringify(entries) : '[]'}`;
	}

	let userSolutionExecution;
	if (paramsAmount > 1) {
		userSolutionExecution = `userSolution.apply(null,entry)`;
	} else {
		userSolutionExecution = `userSolution(entry)`;
	}

	let hiddenSolutionExecution;
	if (paramsAmount > 1) {
		hiddenSolutionExecution = `hiddenSolution.apply(null,entry)`;
	} else {
		hiddenSolutionExecution = `hiddenSolution(entry)`;
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
            
            console.log('Submitted ! Cases passed: '+gotRightAmount+ '/'+convertedEntries.length);`;
}

function TestScaffolding(
	entries,
	paramsAmount,
	testSolution,
	questionType,
	entryFunction = 'solution'
) {
	let convertedEntries;
	if (paramsAmount > 1) {
		convertedEntries = `${
			entries.length > 0
				? JSON.stringify(entries).replace(/"([^"]*)"/g, '[$1]')
				: '[]'
		}`;
	} else {
		convertedEntries = `${entries.length > 0 ? JSON.stringify(entries) : '[]'}`;
	}

	let testSolutionExecution;
	if (paramsAmount > 1) {
		testSolutionExecution = `testSolution.apply(null,entry)`;
	} else {
		testSolutionExecution = `testSolution(entry)`;
	}

	return ` /*---------------ENTRIES---------------*/
            const convertedEntries = ${convertedEntries};
            ${testSolution.replace(entryFunction, 'testSolution')}
            var gotRightAmount = 0;
            for(var i=0;i<convertedEntries.length;i++)
            {
            
                let entry = convertedEntries[i];
                var result = ${testSolutionExecution};
                console.log("case "+i+": "+JSON.stringify(result));
                gotRightAmount++;
                
            }
            
            console.log('Test successful ! Amount of entries tested: '+convertedEntries.length);`;
}

module.exports = {
	CodeScaffolding,
	TestScaffolding,
};
