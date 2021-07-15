export default class ScaffoldError extends Error {
	constructor(message = `Couldn't create scaffold`, ...params) {
		// Pass remaining arguments (including vendor specific ones) to parent constructor
		super(...params);

		// Maintains proper stack trace for where our error was thrown (only available on V8)
		if (Error.captureStackTrace) {
			Error.captureStackTrace(this, ScaffoldError);
		}

		this.scaffoldError = true;
		// Custom debugging information
		this.message = message;
		this.date = new Date();
	}
}

try {
	throw new ScaffoldError('Could not parse');
} catch (e) {
	console.error(e.scaffoldError);
	console.error(e.message);
	console.error(e.stack);
}
