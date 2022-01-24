import { userActions } from "../actions";
import { userInitialState } from "./initialState";



export const userReducer = ( state = userInitialState, action ) => {

  switch ( action.type ) {
    case userActions.SET_LOGIN_STATE:
      return {
        ...state,
        isLoggedIn: true,
        ...action.payload
      };
    default:
      return state;
  }
};
