import React, { useEffect, useState } from "react";
import { Text, Layout, Icon } from "@ui-kitten/components";
import {
  Image,
  StyleSheet,
  View,
  ScrollView,
  TouchableWithoutFeedback
} from "react-native";
import { globalStyles } from "../../../shared/globalStyles";

import { useSelector } from "react-redux";
import { getTopTripsModel } from "../../../models/getTopTripsModel";


const DummyTabs = () => { //to load three blank tabs
  return (
    <>
      {[ 1, 2, 3 ].map( ( category, index ) => (
        <Layout style={[ styles.itemBox, globalStyles.shadowBox, styles.dummyCard ]} key={index} level="3">

        </Layout>
      ) )}
    </>
  )
}


function compare ( a, b ) {
  if ( a.visits < b.visits ) {
    return 1;
  }
  if ( a.visits > b.visits ) {
    return -1;
  }
  return 0;
}

export const TopTrips = ( { navigation } ) => {

  const [ isLoading, setIsLoading ] = useState( true ),
    [ responseMessage, setResponseMessage ] = useState( null ),
    [ topTrips, setTopTrips ] = useState( [] ),
    [ user, setUser ] = useState( useSelector( state => state.user ? state.user : {} ) ),
    viewLandMarkDetails = ( landmark ) => {
      navigation.navigate( "LandmarkDetails", {
        landmark
      } );
    },
    successCallback = ( data ) => {
      const topTrips = data.sort( compare );
      setTopTrips( topTrips );
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
      getTopTripsModel( user.token, callback );
    };

  useEffect( () => {
    if ( topTrips.length === 0 ) {
      fetchDataFromServer();
    } else {
      setIsLoading( false );
    }
  }, [] )


  return (
    <View>
      <View
        style={[
          globalStyles.flexRow,
          globalStyles.justifySpaceBetween,
          globalStyles.mt20
        ]}
      >
        <Text
          style={[
            globalStyles.fontAltBold,
            globalStyles.textBold,
            {
              fontSize: 15
            }
          ]}
        >
          Top Trips
        </Text>
        <Icon
          style={styles.trendingIcon}
          fill="#EE7039"
          name="trending-up-outline"
        />
      </View>
      {responseMessage ? <Text style={globalStyles.textDanger}>{responseMessage}</Text> : null}

      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={200}
        decelerationRate="fast"
      >
        {isLoading ? <DummyTabs /> : null}
        {topTrips.map( ( trip, index ) => (
          <TouchableWithoutFeedback onPress={() => { viewLandMarkDetails( trip ) }} key={index}>
            <Layout style={[ styles.itemBox, globalStyles.shadowBox ]} level="3">
              <Image source={{ uri: trip.image }} style={styles.thumb}></Image>
              <View style={[ styles.caption, globalStyles.centerCenter ]}>
                <Text>{trip.title}</Text>
              </View>
            </Layout>
          </TouchableWithoutFeedback>
        ) )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create( {
  itemBox: {
    padding: 10,
    borderRadius: 5,
    width: "30%",
    marginRight: 20,
    marginVertical: 10
  },
  thumb: {
    width: "100%",
    height: 150,
    borderRadius: 20
  },
  trendingIcon: {
    width: 20,
    height: 20
  },
  caption: {
    height: 40
  },
  dummyCard: {
    width: 100,
    height: 200
  }
} );
