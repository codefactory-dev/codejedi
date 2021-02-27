import { useReducer } from "react";
import counterReducer, { counterDefault } from "./../reducers/counter";
import authReducer, { authDefault } from "./../reducers/auth";
import troughReadingsReducer, { troughReadingsDefault } from "./../reducers/troughReadings";
import solutionReducer, { solutionDefault } from "./../reducers/solution";
import currentQuestionReducer, {currentQuestionDefault} from './../reducers/currentQuestion'
import useAsyncReducer from './useAsyncReducer';

const useCombinedReducers = () => {
  const [counterStore, counter] = useAsyncReducer(counterReducer, counterDefault);
  const [authStore, auth] = useAsyncReducer(authReducer, authDefault);
  const [troughReadingsStore, troughReadings] = useAsyncReducer(troughReadingsReducer,troughReadingsDefault)
  const [solutionStore, solution] = useAsyncReducer(solutionReducer,solutionDefault)
  const [currentQuestionStore, currentQuestion] = useAsyncReducer(currentQuestionReducer,currentQuestionDefault)

  return {
    store: { ...counterStore, ...authStore, ...troughReadingsStore, ...solutionStore, ...currentQuestionStore },
    reducers: [counter, auth, troughReadings, solution, currentQuestion]
  };
};

export default useCombinedReducers;