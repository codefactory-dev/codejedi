require('dotenv').config();
const axios = require('axios');
const util = require('util');
const fs = require('fs');
const assert = require('assert');

function readTextFileSync(filename) {
	try {
		const data = fs.readFileSync(filename, { encoding: 'utf8' });
		return data.toString();
	} catch (e) {
		console.log('Error:', e.stack);
	}
}
function appendToFileSync(filename, data) {
	try {
		fs.appendFileSync(filename, data);
		return true;
	} catch (e) {
		console.log('Error:', e.stack);
	}
}
function removeNewLine(val, replace) {
	assert.strictEqual(
		typeof val,
		'string',
		'newline-remove: val should be a string'
	);
	return val.replace(/(\r\n|\n|\r)/gm, replace);
}
function ConvertCodeToOneLiner(code) {
	const response = removeNewLine(code.toString('utf-8'), '\n');
	console.log(response);
	return response;
}

module.exports = {
	readTextFileSync,
	appendToFileSync,
	ConvertCodeToOneLiner,
};
