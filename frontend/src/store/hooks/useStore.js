import { useContext, createContext } from 'react';
import { authDefault } from '../reducers/auth';
import { counterDefault } from '../reducers/counter';
import { troughReadingsDefault } from '../reducers/troughReadings';
import { solutionDefault } from '../reducers/solution';
import { currentQuestionDefault } from '../reducers/currentQuestion';
import { currentSubmissionDefault } from '../reducers/currentSubmission';

export const defaultStore = {
	store: {
		...authDefault,
		...counterDefault,
		...troughReadingsDefault,
		...solutionDefault,
		...currentQuestionDefault,
		...currentSubmissionDefault,
	},
	dispatch: () => {},
};

export const StoreContext = createContext(defaultStore);
export default () => useContext(StoreContext);
