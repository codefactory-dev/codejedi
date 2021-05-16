const generateFunctionSignature = (funcLanguage,funcParameters,funcName,functReturnType) => {       
    let params;

    if (funcLanguage){
        let lowercaseFuncLanguage = funcLanguage.toLowerCase();
        switch(lowercaseFuncLanguage) {
            case PROGRAMMING_LANGUAGES.JAVASCRIPT:
                params =   funcParameters && funcParameters.reduce((acc, input, idx) => {
                    return `${acc}${input.name}${idx === funcParameters.length-1 ? `` : `, `}`
                }, ``);
        
                return `var ${funcName} = function(${params}) {\n\n\n}`;
                break;


            case PROGRAMMING_LANGUAGES.JAVA:
                params = funcParameters.reduce((acc, input, idx) => {
                    return `${acc}${input.type} ${input.name}${idx === funcParameters.length-1 ? `` : `, `}`
                }, ``);
        
                return `class Solution {\n   public ${functReturnType} ${funcName} (${params}) {\n\n\n   }\n}`;
                break;
        }
    } 
    return '';
}

const PROGRAMMING_LANGUAGES = {
    JAVA: 'java', 
    JAVASCRIPT: 'javascript'
};
const FUNCTION_RETURN_TYPES = {
    INT: 'int', 
    STRING: 'String'
};

module.exports = {
    generateFunctionSignature,
    PROGRAMMING_LANGUAGES,
    FUNCTION_RETURN_TYPES
}