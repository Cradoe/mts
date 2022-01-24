import React, { useEffect, useState } from "react";
import { Text, Layout } from "@ui-kitten/components";
import {
  Image,
  StyleSheet,
  View,
  ScrollView,
  TouchableWithoutFeedback
} from "react-native";
import { useSelector } from "react-redux";
import { globalStyles } from "../../../shared/globalStyles";
import { useDispatch } from "react-redux";
import { getCategoriesModel } from "../../../models/getCategoriesModel";



const DummyTabs = () => { //to load three blank tabs
  return (
    <>
      {[ 1, 2, 3 ].map( ( category, index ) => (
        <Layout
          style={[
            styles.tab,
            styles.dummyTab,
            globalStyles.shadowBox,
            globalStyles.flexRow,
            globalStyles.alignCenter
          ]}
          level="3"
          key={index}
        >
          <Text>{""}</Text>
        </Layout>
      ) )}
    </>
  )
}

export const Categories = ( { navigation } ) => {

  const [ isLoading, setIsLoading ] = useState( true ),
    [ responseMessage, setResponseMessage ] = useState( null ),
    [ categoryList, setCategoryList ] = useState( useSelector( state => state.category ? state.category.list : [] ) ),
    viewLandmarks = ( id, title ) => {
      navigation.navigate( "CategoryLandmarks", {
        id,
        title
      } );
    },
    dispatch = useDispatch(),
    successCallback = ( data ) => {
      // console.log( "data", data );
      setCategoryList( data );
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
      dispatch( getCategoriesModel( callback ) );
    };

  useEffect( () => {
    if ( !categoryList || categoryList.length === 0 ) {
      fetchDataFromServer();
    } else {
      setIsLoading( false );
    }
  }, [] )
  return (
    <View style={globalStyles.mt30}>
      <View>
        <Text
          style={[
            globalStyles.fontAltBold,
            globalStyles.textBold,
            {
              fontSize: 15
            }
          ]}
        >
          Categories
        </Text>
      </View>

      {responseMessage ? <Text style={globalStyles.textDanger}>{responseMessage}</Text> : null}
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={200}
        decelerationRate="fast"
        style={styles.scrollView}
      >
        {isLoading ? <DummyTabs /> : null}

        {categoryList && categoryList.length > 0 ?
          categoryList.map( ( category, index ) => (
            <TouchableWithoutFeedback
              onPress={() => {
                viewLandmarks( category.id, category.name );
              }}
              key={index}
            >
              <Layout
                style={[
                  styles.tab,
                  globalStyles.shadowBox,
                  globalStyles.flexRow,
                  globalStyles.alignCenter
                ]}
                level="3"
              >
                <Text>{category.category}</Text>
              </Layout>
            </TouchableWithoutFeedback>
          ) ) : null}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create( {
  scrollView: {
    padding: 10
  },
  tab: {
    padding: 10,
    borderRadius: 5,
    width: "auto",
    marginRight: 20,
    marginVertical: 10
  },
  dummyTab: {
    width: 100,
  },
  thumb: {
    height: 40,
    width: 40,
    marginRight: 10
  }
} );
