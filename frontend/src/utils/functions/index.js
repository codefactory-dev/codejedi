export const generateFunctionSignature = (
	funcLanguage,
	funcParameters,
	funcName,
	functReturnType
) => {
	let params;

	if (funcLanguage) {
		const lowercaseFuncLanguage = funcLanguage.toLowerCase();
		switch (lowercaseFuncLanguage) {
			case PROGRAMMING_LANGUAGES.JAVASCRIPT:
				params =
					funcParameters &&
					funcParameters.reduce(
						(acc, input, idx) =>
							`${acc}${input.name}${
								idx === funcParameters.length - 1 ? `` : `, `
							}`,
						``
					);

				return `var ${funcName} = function(${params}) {\n\n\n}`;
				break;

			case PROGRAMMING_LANGUAGES.JAVA:
				params = funcParameters.reduce(
					(acc, input, idx) =>
						`${acc}${input.type} ${input.name}${
							idx === funcParameters.length - 1 ? `` : `, `
						}`,
					``
				);

				return `class Solution {\n   public ${functReturnType} ${funcName} (${params}) {\n\n\n   }\n}`;
				break;
		}
	}
	return '';
};

export const PROGRAMMING_LANGUAGES = {
	JAVASCRIPT: 'javascript',
};
export const FUNCTION_RETURN_TYPES = {
	INT: 'int',
	STRING: 'String',
};
