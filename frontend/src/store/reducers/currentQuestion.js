export const currentQuestionDefault = {
    currentQuestion: ''
};
  
export const SELECT_CURRENT_QUESTION = "SELECT_CURRENT_QUESTION";
  
const currentQuestionReducer = (state = currentQuestionDefault, action) => {
    switch (action.type) {
    case SELECT_CURRENT_QUESTION:
        console.log("setting current question to: "+JSON.stringify(action.data))
        return {
            ...state,
            currentQuestion: action.data
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

export default currentQuestionReducer;