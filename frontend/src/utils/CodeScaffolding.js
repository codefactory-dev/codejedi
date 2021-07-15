import ScaffoldError from 'Errors/ScaffoldError';

const languageTypes = require('./languageTypes.js');

export function CodeScaffolding(
	entries,
	paramsAmount,
	userSolution,
	hiddenSolution,
	questionType,
	languageType,
	entryFunction = 'solution'
) {
	try {
		let CodeScaffolding;
		const lowercaseLanguage = languageType.toLowerCase();
		switch (lowercaseLanguage) {
			case languageTypes.Javascript:
				CodeScaffolding =
					require('../code_scaffold/javascript/index.js').CodeScaffolding;
				break;
			case languageTypes.Java:
				CodeScaffolding = require('../code_scaffold/java/index.js');
				break;
			default:
				CodeScaffolding = require('../code_scaffold/javascript/index.js');
		}
		return CodeScaffolding(
			entries,
			paramsAmount,
			userSolution,
			hiddenSolution,
			questionType,
			entryFunction
		);
	} catch (error) {
		throw new ScaffoldError(`Error creating Scaffold. ${error}`);
	}
}

export function TestScaffolding(
	entries,
	paramsAmount,
	testSolution,
	questionType,
	languageType,
	entryFunction = 'solution'
) {
	try {
		let TestScaffolding;
		const lowercaseLanguage = languageType.toLowerCase();
		switch (lowercaseLanguage) {
			case languageTypes.Javascript:
				TestScaffolding =
					require('../code_scaffold/javascript/index.js').TestScaffolding;
				break;
			case languageTypes.Java:
				TestScaffolding = require('../code_scaffold/java/index.js');
				break;
			default:
				TestScaffolding = require('../code_scaffold/javascript/index.js');
		}
		return TestScaffolding(
			entries,
			paramsAmount,
			testSolution,
			questionType,
			entryFunction
		);
	} catch (error) {
		throw new ScaffoldError(`Error creating Scaffold. ${error}`);
	}
}
