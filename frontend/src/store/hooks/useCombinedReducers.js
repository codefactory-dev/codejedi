import { useReducer } from "react";
import counterReducer, { counterDefault } from "./../reducers/counter";
import authReducer, { authDefault } from "./../reducers/auth";
import troughReadingsReducer, { troughReadingsDefault } from "./../reducers/troughReadings";
import solutionReducer, { solutionDefault } from "./../reducers/solution";
import useAsyncReducer from './useAsyncReducer';

const useCombinedReducers = () => {
  const [counterStore, counter] = useAsyncReducer(counterReducer, counterDefault);
  const [authStore, auth] = useAsyncReducer(authReducer, authDefault);
  const [troughReadingsStore, troughReadings] = useAsyncReducer(troughReadingsReducer,troughReadingsDefault)
  const [solutionStore, solution] = useAsyncReducer(solutionReducer,solutionDefault)

  return {
    store: { ...counterStore, ...authStore, ...troughReadingsStore, ...solutionStore },
    reducers: [counter, auth, troughReadings, solution]
  };
};

export default useCombinedReducers;