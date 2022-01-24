import React, { useState, useEffect } from "react";
import { Text, Layout } from "@ui-kitten/components";
import {
  Image,
  StyleSheet,
  View,
  TouchableWithoutFeedback
} from "react-native";
import { globalStyles } from "../../../shared/globalStyles";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { searchQueryModel } from "../../../models/searchQueryModel";
import { globalConstants } from "../../../constants";


export const ListLandmarks = ( { navigation, query } ) => {

  const [ isLoading, setIsLoading ] = useState( true ),
    [ responseMessage, setResponseMessage ] = useState( null ),
    [ noResult, setNoResult ] = useState( false ),
    [ landmarks, setLandmarks ] = useState( useSelector( state => state.trips ? state.trips.landmarks : [] ) ),
    [ user, setUser ] = useState( useSelector( state => state.user ? state.user : {} ) ),
    viewLandMarkDetails = ( landmark ) => {
      navigation.navigate( "LandmarkDetails", {
        landmark
      } );
    },
    successCallback = ( data ) => {
      if ( data.length > 0 ) {
        setLandmarks( data );
      } else {
        setNoResult( true );
      }
      console.log( "fff" );
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
      searchQueryModel( query, callback );
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
      {isLoading ? (
        <View style={[ { height: globalConstants.SCREEN_HEIGHT, width: globalConstants.SCREEN_WIDTH }, globalStyles.flexCenterCenter ]}>
          <Text style={globalStyles.textDark}>Loading, please wait...</Text>
        </View>
      ) : null}
      {noResult ?
        <View>
          <Text>No result found</Text>
        </View>
        : null}
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
