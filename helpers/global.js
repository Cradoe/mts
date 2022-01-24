
export const convertObjToFormData = ( object ) => {
    const formData = new FormData();
    for ( const key in object ) {
        if ( Object.hasOwnProperty.call( object, key ) ) {
            formData.append( key, object[ key ] );
        }
    }
    return formData;
};
