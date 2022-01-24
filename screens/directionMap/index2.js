import React, { useEffect, useState } from "react";
import { Dimensions, StyleSheet } from "react-native";
import MapView from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";

const { width, height } = Dimensions.get( "window" );

const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const GOOGLE_MAPS_APIKEY = "AIzaSyDsXZjVV0JW6eohPMYnx4Wk7pNs8pQN5hE";

const DirectionMap = ( { route } ) => {
    const { landmark } = route.params
    const [ position, setPosition ] = useState( {} )
    const [ coordinates, setCoordinates ] = useState( [
        {
            latitude: 37.3317876,
            longitude: -122.0054812
        },
        {
            latitude: Number( landmark.latitude ),
            longitude: Number( landmark.longitude )
        }
    ] )
    const [ mapView, setMapView ] = useState( null )




    const onMapPress = ( e ) => {
        setCoordinates( [ ...coordinates, e.nativeEvent.coordinate ] );
    };

    useEffect( () => {
        navigator.geolocation.getCurrentPosition( ( position ) => {
            setPosition( { longitude: position.coords.longitude, latitude: position.coords.latitude } )
            console.log( "position", position );
        }, ( error ) => {
            alert( JSON.stringify( error ) )
        }, {
            enableHighAccuracy: true,
            timeout: 20000,
            maximumAge: 1000
        } );
    }, [] );


    return (
        <>
            {position && position.latitude && position.longitude ?
                <MapView
                    initialRegion={{
                        latitude: position.latitude,
                        longitude: position.longitude,
                        latitudeDelta: LATITUDE_DELTA,
                        longitudeDelta: LONGITUDE_DELTA
                    }}
                    style={StyleSheet.absoluteFill}
                    ref={( c ) => ( setMapView( c ) )}
                    onPress={onMapPress}
                >
                    {coordinates.map( ( coordinate, index ) => (
                        <MapView.Marker key={`coordinate_${index}`} coordinate={coordinate} />
                    ) )}
                    {coordinates.length >= 2 && (
                        <MapViewDirections
                            origin={coordinates[ 0 ]}
                            waypoints={
                                coordinates.length > 2
                                    ? coordinates.slice( 1, -1 )
                                    : []
                            }
                            mode="WALKING"
                            destination={
                                coordinates[ coordinates.length - 1 ]
                            }
                            apikey={GOOGLE_MAPS_APIKEY}
                            strokeWidth={3}
                            strokeColor="hotpink"
                            optimizeWaypoints={true}
                            onStart={( params ) => {
                                console.log(
                                    `Started routing between "${params.origin}" and "${params.destination}"`
                                );
                            }}
                            onReady={( result ) => {
                                console.log( "Distance: ${result.distance} km" );
                                console.log( "Duration: ${result.duration} min." );
                                mapView.fitToCoordinates( result.coordinates, {
                                    edgePadding: {
                                        right: width / 20,
                                        bottom: height / 20,
                                        left: width / 20,
                                        top: height / 20
                                    }
                                } );
                            }}
                            onError={( errorMessage ) => {
                                console.log( 'GOT AN ERROR again', errorMessage );
                            }}
                        />
                    )}
                </MapView>
                : null}
        </>
    );

}

export default DirectionMap;
