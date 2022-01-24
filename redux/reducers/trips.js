import { tripAction } from "../actions";



export const tripReducer = ( state = [], action ) => {

    switch ( action.type ) {
        case tripAction.SET_TRIPS:
            return {
                ...state,
                list: action.payload
            };
        case tripAction.SET_LANDMARKS:
            return {
                ...state,
                landmarks: action.payload
            };
        default:
            return state;
    }
};
