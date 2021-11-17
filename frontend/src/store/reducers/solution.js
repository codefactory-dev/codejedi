export const solutionDefault = {
	solution: '',
};

export const SAVE_SOLUTION = 'SAVE_SOLUTION';

const solutionReducer = (state = solutionDefault, action) => {
	switch (action.type) {
		case SAVE_SOLUTION:
			return {
				...state,
				solution: action.data,
			};
		default:
			return state;
	}
};

export const saveSolutionAction = (payload) => ({
	type: SAVE_SOLUTION,
	data: payload,
});

export default solutionReducer;
