import { useContext, createContext } from "react";
import { authDefault } from "../reducers/auth";
import { counterDefault } from "../reducers/counter";
import { troughReadingsDefault } from "../reducers/troughReadings";
import { solutionDefault } from "../reducers/solution";
import { currentQuestionDefault } from "../reducers/currentQuestion";

export const defaultStore = {
  store: { ...authDefault, ...counterDefault, ...troughReadingsDefault, ...solutionDefault, ...currentQuestionDefault },
  dispatch: () => {}
};

export const StoreContext = createContext(defaultStore);
export default () => {
  return useContext(StoreContext);
};