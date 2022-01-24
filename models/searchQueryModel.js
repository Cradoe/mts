import { globalConstants } from "../constants";
import { catchApiRequestError, handleApiResponseError } from "../helpers";
import { searchAPI } from "../services/apiServices/searchApiService";


export const searchQueryModel = ( query, callback = {} ) => {
    try {
        console.log( "query", query );
        fetch( searchAPI.SEARCH_QUERY( query ), {
            ...globalConstants.GET_HEADER
        } )
            .then( ( response ) => response.json() )
            .then( ( json ) => {
                const { status, data, success } = json;
                console.log( "data search", json );
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
