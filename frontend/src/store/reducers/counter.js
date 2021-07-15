export const counterDefault = {
	counter: 0,
};

export const INCREMENT = 'INCREMENT';
export const DECREMENT = 'DECREMENT';
export const RESET = 'RESET';

const counterReducer = (state = counterDefault, action) => {
	switch (action.type) {
		case INCREMENT:
			return {
				...state,
				counter: state.counter + 1,
			};
		case DECREMENT:
			return {
				...state,
				counter: state.counter - 1,
			};
		case RESET:
			return {
				counter: 0,
			};
		default:
			return state;
	}
};

export const incrementAction = () => ({
	type: INCREMENT,
});

export const decrementAction = () => ({
	type: DECREMENT,
});

export const resetAction = () => ({
	type: RESET,
});

export default counterReducer;
