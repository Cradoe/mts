import React, { useEffect, useState } from "react";
import { Layout } from "@ui-kitten/components";
import { SafeAreaView } from "react-native";
import { globalStyles } from "../../shared/globalStyles";
import { ListLandmarks } from "../../components/SearchResults";
import { ScrollView } from "react-native-gesture-handler";

const SearchResults = ( { navigation, route } ) => {
  const searchQuery = route.params.query;
  const [ title, setTitle ] = useState( searchQuery );

  useEffect( () => {
    navigation.setOptions( { title: title } );
    return () => { };
  }, [ title ] );

  return (
    <SafeAreaView>
      <Layout style={[ globalStyles.containerPadding, globalStyles.screenBg ]}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <ListLandmarks query={searchQuery} navigation={navigation} />
        </ScrollView>
      </Layout>
    </SafeAreaView>
  );
};
export default SearchResults;
