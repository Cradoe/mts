import React, { useEffect, useState, Component } from "react";

import { View, Button } from "react-native";
import getDirections from 'react-native-google-maps-directions'

export default class DirectionMap extends Component {

    handleGetDirections = () => {
        const data = {
            source: {
                latitude: -33.8356372,
                longitude: 18.6947617
            },
            destination: {
                latitude: -33.8600024,
                longitude: 18.697459
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
            waypoints: [
                {
                    latitude: -33.8600025,
                    longitude: 18.697452,
                },
                {
                    latitude: -33.8600026,
                    longitude: 18.697453,
                },
                {
                    latitude: -33.8600036,
                    longitude: 18.697493,
                },
                {
                    latitude: -33.8600046,
                    longitude: 18.69743,
                },

            ]
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