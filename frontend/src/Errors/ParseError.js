export default class ParseError extends Error {
	constructor(message = `Couldn't parse`, ...params) {
		// Pass remaining arguments (including vendor specific ones) to parent constructor
		super(...params);

		// Maintains proper stack trace for where our error was thrown (only available on V8)
		if (Error.captureStackTrace) {
			Error.captureStackTrace(this, ParseError);
		}

		this.parseError = true;
		// Custom debugging information
		this.message = message;
		this.date = new Date();
	}
}

try {
	throw new ParseError('Could not parse');
} catch (e) {
	console.error(e.parseError);
	console.error(e.message);
	console.error(e.stack);
}
