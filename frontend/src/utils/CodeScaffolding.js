const languageTypes = require('./languageTypes.js')

function CodeScaffolding(entries, userSolution, hiddenSolution, questionType,languageType)
{
    let CodeScaffolding;
    switch(languageType){
        case languageTypes.Javascript:
            CodeScaffolding = require('../code_scaffold/javascript/index.js');
            break;
        case languageTypes.Java:
            CodeScaffolding = require('../code_scaffold/java/index.js');
            break;
        default:
            CodeScaffolding = require('../code_scaffold/javascript/index.js');
    }
    return CodeScaffolding(entries, userSolution, hiddenSolution, questionType);
}

module.exports = CodeScaffolding