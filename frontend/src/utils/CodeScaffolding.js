const path = require('path')
const testCasesFilePath = path.join(__dirname,'/test_codes/.testcases.txt');
const { readTextFile, readTextFileSync } = require('./TextReadingUtils');

async function CodeScaffolding()
{
    console.log("testCasesFilePath = "+testCasesFilePath);
    const result = readTextFileSync(testCasesFilePath);
    console.log("result: "+result);
}
CodeScaffolding();