import React, { useEffect, useState, Component } from "react";

import { View, Button } from "react-native";
import getDirections from 'react-native-google-maps-directions'

export default class DirectionMap extends Component {

  handleGetDirections = () => {
    const data = {
      source: {
        latitude: 6.8874801,
        longitude: 2.9968379
      },
      destination: {
        latitude: 6.896146448676478,
        longitude: 3.026422225994895
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

  render () {
    return (
      <View>
        <Button onPress={this.handleGetDirections} title="Get Directions" />
      </View>
    );
  }
}