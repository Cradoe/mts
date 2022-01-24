import React, { useState } from "react";
import { Text, Icon, Input } from "@ui-kitten/components";
import {
  Alert,
  StyleSheet,
  TouchableWithoutFeedback,
  View
} from "react-native";
import { globalStyles } from "../../../shared/globalStyles";

export const SearchArea = ( { navigation } ) => {
  const [ query, setQuery ] = useState( "" );

  const search = () => {
    navigation.navigate( "SearchResults", {
      query: query
    } );
  };

  const searchIcon = ( props ) => (
    <TouchableWithoutFeedback onPress={search}>
      <Icon {...props} name="search-outline" />
    </TouchableWithoutFeedback>
  );

  return (
    <View style={globalStyles.mt30}>
      <View>
        <Text
          style={[
            globalStyles.fontAltBold,
            globalStyles.textBold,
            {
              fontSize: 25
            }
          ]}
        >
          Where do
        </Text>
        <Text
          style={[
            globalStyles.fontAltBold,
            globalStyles.textBold,
            {
              fontSize: 25
            }
          ]}
        >
          you want to go?
        </Text>
      </View>
      <View style={globalStyles.mt20}>
        <Input
          value={query}
          keyboardType="web-search"
          placeholder="Search for places"
          accessoryRight={searchIcon}
          style={[ styles.searchBox, globalStyles.shadowBox ]}
          onChangeText={( nextValue ) => setQuery( nextValue )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create( {
  avatar: {
    height: 30,
    width: 30,
    marginRight: 20
  },
  icon: {
    width: 25,
    height: 25
  },
  searchBox: {
    borderRadius: 30,
    width: "90%"
  }
} );
