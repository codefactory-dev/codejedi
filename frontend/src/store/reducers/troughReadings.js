import api from '../../services/api';
import { format, parseISO, startOfDay, endOfDay, subDays } from 'date-fns';

export const troughReadingsDefault = {
    troughReadings: [],
};
  
export const INCREMENT = "INCREMENT";
export const DECREMENT = "DECREMENT";
export const RESET = "RESET";
export const LOAD_TROUGH_READING = "LOAD_TROUGH_READING";
  
const troughReadingsReducer = async (state = troughReadingsDefault, action) => {
    switch (action.type) {
        case LOAD_TROUGH_READING:
            try {
                const { moduleId, lineId, date, sort } = action.data;

                const formatedDate = format(action.data.date, 'yyyy-MM-dd');
                const order = sort ? `&sort=${sort}` : '';

                let response = null;

                if (moduleId && lineId) {
                    response = await api.get(`v1/troughReadings?moduleId=${moduleId}&lineId=${lineId}&date=${formatedDate}${order}`)
                    
                } else if (moduleId) {
                    response = await api.get(`v1/troughReadings?moduleId=${moduleId}&date=${formatedDate}${order}`);
                } else {
                    response = await api.get(`v1/troughReadings?date=${formatedDate}${order}`);
                }
                const { data } = response;
                return {                
                    ...state,
                    troughReadings: data
                }
            } catch(error) {
                console.log("error while troughReading. "+error)
                return {                
                    ...state
                }
            }

        case INCREMENT:
            return {
                ...state,
                counter: state.counter + 1
            };
        case DECREMENT:
            return {
                ...state,
                counter: state.counter - 1
            };
        case RESET:
            return {
                counter: 0
            };
        default:
            return state;
    }
};
  
export const incrementAction = () => {
    return {
        type: INCREMENT
    };
};

export const decrementAction = () => {
    return {
        type: DECREMENT
    };
};

export const resetAction = () => {
    return {
        type: RESET
    };
};

export const loadTroughReadingAction = (payload) => {
    console.log("loading troughReadingAction. this is the payload: "+JSON.stringify(payload))
    return {
        type: LOAD_TROUGH_READING,
        data: payload
    };
};

export default troughReadingsReducer;