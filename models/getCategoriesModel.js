import { globalConstants } from "../constants";
import { catchApiRequestError, handleApiResponseError } from "../helpers";
import { categoryAction } from "../redux/actions";
import { categoryAPI } from "../services/apiServices/categoryApiService";


const setCategories = ( payload = {} ) => {
    return {
        type: categoryAction.SET_CATEGORIES,
        payload
    };
};


export const getCategoriesModel = ( callback = {} ) => {
    return ( dispatch ) => {
        try {
            fetch( categoryAPI.GET_ALL, {
                ...globalConstants.GET_HEADER
            } )
                .then( ( response ) => response.json() )
                .then( ( json ) => {
                    const { status, data, success } = json;
                    if ( success === true && status === 200 ) {

                        dispatch( setCategories( data ) );

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
