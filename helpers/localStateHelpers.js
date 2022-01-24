const { retrieveDataFromLocalStorage } = require( "./storageHelpers" );

export const mapInitialDataFromLocalState = async ( state ) => {
    const localState = await retrieveDataFromLocalStorage( "user" );
    if ( localState ) {
        state = {
            ...state,
            ...localState
        }
    }
    return state;
}