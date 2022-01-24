import { globalConstants } from "../constants";
import { catchApiRequestError, handleApiResponseError, convertObjToFormData } from "../helpers";
import { userActions } from "../redux/actions";
import { userAPI } from "../services/apiServices/userApiService";

const setLoginState = ( payload = {} ) => {
    return {
        type: userActions.SET_LOGIN_STATE,
        payload
    };
};

export const loginModel = ( input, callback = {} ) => {
    return ( dispatch ) => {
        try {
            fetch( userAPI.LOGIN_ENDPOINT, {
                ...globalConstants.POST_HEADER,
                body: convertObjToFormData( input )
            } )
                .then( ( response ) => response.json() )
                .then( ( json ) => {
                    const { status, data, success, token } = json;
                    if ( success === true && status === 200 ) {
                        const newData = {
                            ...data,
                            token
                        }
                        dispatch( setLoginState( newData ) );
                        if ( callback.success ) {
                            return callback.success( newData );
                        }
                    } else {
                        callback.error( handleApiResponseError( json ) );
                    }
                } )
                .catch( ( error ) => {
                    callback.error( catchApiRequestError( error ) );
                } );
        } catch ( error ) {
            callback.error( catchApiRequestError( error ) );
        }
    }
};
