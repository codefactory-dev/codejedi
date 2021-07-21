import { useReducer } from 'react';
import counterReducer, { counterDefault } from '../reducers/counter';
import authReducer, { authDefault } from '../reducers/auth';
import troughReadingsReducer, {
	troughReadingsDefault,
} from '../reducers/troughReadings';
import solutionReducer, { solutionDefault } from '../reducers/solution';
import currentQuestionReducer, {
	currentQuestionDefault,
} from '../reducers/currentQuestion';
import currentSubmissionReducer, {
	currentSubmissionDefault,
} from '../reducers/currentSubmission';
import useAsyncReducer from './useAsyncReducer';

const useCombinedReducers = () => {
	const [counterStore, counter] = useAsyncReducer(
		counterReducer,
		counterDefault
	);
	const [authStore, auth] = useAsyncReducer(authReducer, authDefault);
	const [troughReadingsStore, troughReadings] = useAsyncReducer(
		troughReadingsReducer,
		troughReadingsDefault
	);
	const [solutionStore, solution] = useAsyncReducer(
		solutionReducer,
		solutionDefault
	);
	const [currentQuestionStore, currentQuestion] = useAsyncReducer(
		currentQuestionReducer,
		currentQuestionDefault
	);
	const [currentSubmissionStore, currentSubmission] = useAsyncReducer(
		currentSubmissionReducer,
		currentSubmissionDefault
	);

	return {
		store: {
			...counterStore,
			...authStore,
			...troughReadingsStore,
			...solutionStore,
			...currentQuestionStore,
			...currentSubmissionStore,
		},
		reducers: [
			counter,
			auth,
			troughReadings,
			solution,
			currentQuestion,
			currentSubmission,
		],
	};
};

export default useCombinedReducers;
