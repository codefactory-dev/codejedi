export const currentSubmissionDefault = {
    currentSubmission: ''
};
  
export const SELECT_CURRENT_SUBMISSION = "SELECT_CURRENT_SUBMISSION";
export const DESELECT_CURRENT_SUBMISSION = "DESELECT_CURRENT_SUBMISSION";
  
const currentSubmissionReducer = (state = currentSubmissionDefault, action) => {
    switch (action.type) {
    case SELECT_CURRENT_SUBMISSION:
        console.log("setting current submission to: "+JSON.stringify(action.data))
        return {
            ...state,
            currentSubmission: action.data
        };
    case DESELECT_CURRENT_SUBMISSION:
        console.log("clearing current submission")
        return {
            ...state,
            currentSubmission: null
        };
    default:
        return state;
    }
};
  
export const selectCurrentSubmissionAction = (payload) => {
    return {
        type: SELECT_CURRENT_SUBMISSION,
        data: payload
    };
};

export const deselectCurrentSubmissionAction = () => {
    return {
        type: DESELECT_CURRENT_SUBMISSION
    };
};

export default currentSubmissionReducer;