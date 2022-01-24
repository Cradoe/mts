import { globalConstants } from "../constants";
import { catchApiRequestError, handleApiResponseError } from "../helpers";
import { tripAPI } from "../services/apiServices/tripApiService";


export const getTopTripsModel = ( token, callback = {} ) => {

    try {
        fetch( tripAPI.ALL_VISITS, {
            ...globalConstants.GET_HEADER,
            headers: new Headers( {
                'Authorization': `Bearer ${token}`
            } )
        } )
            .then( ( response ) => response.json() )
            .then( ( json ) => {
                const { data, success } = json;
                if ( success === true ) {
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


};
