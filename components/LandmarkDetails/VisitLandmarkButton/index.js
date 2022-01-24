import React, { useState, useEffect } from "react";
import { Button, Icon } from "@ui-kitten/components";
import { StyleSheet } from "react-native";
import { globalStyles } from "../../../shared/globalStyles";
import getDirections from 'react-native-google-maps-directions'

const searchIcon = ( props ) => <Icon {...props} name="navigation-2-outline" />;

export const VisitLandmarkButton = ( { landmark } ) => {

  const [ position, setPosition ] = useState( {} );
  const handleGetDirections = () => {
    const data = {
      source: {
        latitude: position.latitude,
        longitude: position.longitude
      },
      destination: {
        latitude: landmark.latitude,
        longitude: landmark.longitude
      },
      params: [
        {
          key: "travelmode",
          value: "walking"        // may be "walking", "bicycling" or "transit" as well
        },
        {
          key: "dir_action",
          value: "navigate"       // this instantly initializes navigation using the given travel mode
        }
      ],
      waypoints: []
    }

    getDirections( data )
  }

  useEffect( () => {
    navigator.geolocation.getCurrentPosition( ( position ) => {
      setPosition( { longitude: position.coords.longitude, latitude: position.coords.latitude } );
    }, ( error ) => {
      alert( JSON.stringify( error ) )
    }, {
      enableHighAccuracy: true,
      timeout: 20000,
      maximumAge: 1000
    } );
  }, [] );

  return (
    <Button
      onPress={handleGetDirections}
      style={[ globalStyles.mt20, styles.btn ]}
      accessoryRight={searchIcon}
    >
      Visit Now
    </Button>
  );
};

const styles = StyleSheet.create( {
  btn: {
    backgroundColor: "#000",
    borderWidth: 0
  }
} );
