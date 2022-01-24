import { convertObjToFormData, globalConstants, userConstants } from "../constants";
import { catchApiRequestError, handleApiResponseError } from "../helpers";
import { userAPI } from "../services/apiServices/userApiService";

const setLoginState = ( payload = {} ) => {
    return {
        type: userConstants.SET_LOGIN_STATE,
        payload
    };
};

export const registerModel = ( input, callback = {} ) => {
    return ( dispatch ) => {
        try {
            fetch( userAPI.REGISTER_ENDPOINT, {
                ...globalConstants.POST_HEADER,
                body: convertObjToFormData( input )
            } )
                .then( ( response ) => response.json() )
                .then( ( json ) => {
                    const { status, data, success } = json;
                    if ( success === true && status === 201 ) {
                        dispatch( setLoginState( data ) );
                        if ( callback.success ) {
                            return callback.success();
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
