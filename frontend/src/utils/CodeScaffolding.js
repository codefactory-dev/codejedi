import ScaffoldError from 'Errors/ScaffoldError'
const languageTypes = require('./languageTypes.js')

export default function CodeScaffolding(entries, userSolution, hiddenSolution, questionType,languageType,entryFunction="solution")
{
    try {
        let CodeScaffolding;
        let lowercaseLanguage = languageType.toLowerCase();
        switch(lowercaseLanguage){
            case languageTypes.Javascript:
                CodeScaffolding = require('../code_scaffold/javascript/index.js');
                break;
            case languageTypes.Java:
                CodeScaffolding = require('../code_scaffold/java/index.js');
                break;
            default:
                CodeScaffolding = require('../code_scaffold/javascript/index.js');
        }
        return CodeScaffolding(entries, userSolution, hiddenSolution, questionType,entryFunction);
    } catch (error) {
        throw new ScaffoldError('Error creating Scaffold. '+error)
    }
    
}
