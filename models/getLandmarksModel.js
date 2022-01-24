import { globalConstants } from "../constants";
import { catchApiRequestError, handleApiResponseError } from "../helpers";
import { tripAction } from "../redux/actions";
import { tripAPI } from "../services/apiServices/tripApiService";


const setLandmarks = ( payload = {} ) => {
    return {
        type: tripAction.SET_LANDMARKS,
        payload
    };
};


export const getLandmarksModel = ( token, callback = {} ) => {
    return ( dispatch ) => {
        try {
            fetch( tripAPI.EXPLORE_ALL, {
                ...globalConstants.GET_HEADER,
                headers: new Headers( {
                    'Authorization': `Bearer ${token}`
                } )
            } )
                .then( ( response ) => response.json() )
                .then( ( json ) => {
                    const { status, data, success } = json;
                    if ( success === true ) {

                        dispatch( setLandmarks( data ) );

                        if ( callback.success ) {
                            return callback.success( data );
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
