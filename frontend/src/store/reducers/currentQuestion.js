export const currentQuestionDefault = {
    currentQuestion: ''
};
  
export const SELECT_CURRENT_QUESTION = "SELECT_CURRENT_QUESTION";
export const DESELECT_CURRENT_QUESTION = "DESELECT_CURRENT_QUESTION";
  
const currentQuestionReducer = (state = currentQuestionDefault, action) => {
    switch (action.type) {
    case SELECT_CURRENT_QUESTION:
        console.log("setting current question to: "+JSON.stringify(action.data))
        return {
            ...state,
            currentQuestion: action.data
        };
    case DESELECT_CURRENT_QUESTION:
        console.log("clearing current question")
        return {
            ...state,
            currentQuestion: null
        };
    default:
        return state;
    }
};
  
export const selectCurrentQuestionAction = (payload) => {
    return {
        type: SELECT_CURRENT_QUESTION,
        data: payload
    };
};

export const deselectCurrentQuestionAction = () => {
    return {
        type: DESELECT_CURRENT_QUESTION
    };
};

export default currentQuestionReducer;