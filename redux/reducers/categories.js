import { categoryAction } from "../actions";
import { categoriesInitialState } from "./initialState";



export const categoryReducer = ( state = [], action ) => {

    switch ( action.type ) {
        case categoryAction.SET_CATEGORIES:
            return {
                ...state,
                list: action.payload
            };
        default:
            return state;
    }
};
