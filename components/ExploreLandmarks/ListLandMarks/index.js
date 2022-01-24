import React, { useState, useEffect } from "react";
import { Text, Layout } from "@ui-kitten/components";
import {
  Image,
  StyleSheet,
  View,
  TouchableWithoutFeedback
} from "react-native";
import { globalStyles } from "../../../shared/globalStyles";
import {
  Flexidink,
  loginScreenBg,
  splashScreenBg
} from "../../../shared/generalAssets";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getLandmarksModel } from "../../../models/getLandmarksModel";

const categoryLists = [
  {
    heading: "A",
    items: [
      { name: "Camp", image: splashScreenBg },
      { name: "Mountain", image: loginScreenBg },
      { name: "Restraunt", image: Flexidink },
      { name: "Camp", image: splashScreenBg }
    ]
  },
  {
    heading: "B",
    items: [
      { name: "Camp", image: splashScreenBg },
      { name: "Mountain", image: loginScreenBg },
      { name: "Restraunt", image: Flexidink },
      { name: "Camp", image: splashScreenBg }
    ]
  },
  {
    heading: "C",
    items: [
      { name: "Camp", image: splashScreenBg },
      { name: "Mountain", image: loginScreenBg },
      { name: "Restraunt", image: Flexidink },
      { name: "Camp", image: splashScreenBg }
    ]
  },
  {
    heading: "D",
    items: [
      { name: "Camp", image: splashScreenBg },
      { name: "Mountain", image: loginScreenBg },
      { name: "Restraunt", image: Flexidink },
      { name: "Camp", image: splashScreenBg }
    ]
  },
  {
    heading: "E",
    items: [
      { name: "Camp", image: splashScreenBg },
      { name: "Mountain", image: loginScreenBg },
      { name: "Restraunt", image: Flexidink },
      { name: "Camp", image: splashScreenBg }
    ]
  }
];

export const ListLandmarks = ( { navigation } ) => {

  const [ isLoading, setIsLoading ] = useState( true ),
    [ responseMessage, setResponseMessage ] = useState( null ),
    [ landmarks, setLandmarks ] = useState( useSelector( state => state.trips ? state.trips.landmarks : [] ) ),
    [ user, setUser ] = useState( useSelector( state => state.user ? state.user : {} ) ),
    viewLandMarkDetails = ( landmark ) => {
      navigation.navigate( "LandmarkDetails", {
        landmark
      } );
    },
    dispatch = useDispatch(),
    successCallback = ( data ) => {
      setLandmarks( data );
      setIsLoading( false );
    },
    errorCallback = ( error ) => {
      setIsLoading( false );
      setResponseMessage( error );
    },
    callback = {
      success: successCallback,
      error: errorCallback
    },
    fetchDataFromServer = () => {
      setIsLoading( true );
      setResponseMessage( null );
      dispatch( getLandmarksModel( user.token, callback ) );
    };

  useEffect( () => {
    if ( landmarks.length === 0 ) {
      fetchDataFromServer();
    } else {
      setIsLoading( false );
    }
  }, [] )
  return (
    <View
      style={[
        globalStyles.flexRow,
        globalStyles.justifySpaceBetween,
        { flexWrap: "wrap" }
      ]}
    >

      {landmarks && landmarks.map( ( landmark ) => (
        <TouchableWithoutFeedback
          onPress={() => viewLandMarkDetails( landmark )}
          key={landmark.id}
        >
          <Layout
            style={[ styles.itemBox, globalStyles.shadowBox ]}
            level="3"
          >
            <Image source={{ uri: landmark.image }} style={styles.thumb}></Image>
            <View style={[ styles.caption, globalStyles.centerCenter ]}>
              <Text>{landmark.title}</Text>
            </View>
          </Layout>
        </TouchableWithoutFeedback>
      ) )}


    </View>
  );
};

const styles = StyleSheet.create( {
  itemBox: {
    padding: 10,
    borderRadius: 5,
    width: "47%",
    marginVertical: 10
  },
  thumb: {
    width: "100%",
    height: 150,
    borderRadius: 20
  },
  caption: {
    height: 40
  }
} );
