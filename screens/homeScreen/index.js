import React from "react";
import { Layout } from "@ui-kitten/components";
import { SafeAreaView, StyleSheet } from "react-native";
import { globalConstants } from "../../constants";
import {
  Categories,
  Header,
  SearchArea,
  TopTrips
} from "../../components/Home";
import { globalStyles } from "../../shared/globalStyles";
import { ExploreButton } from "../../components/Home/ExploreButton";


const Home = ( { navigation } ) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Layout
        style={[
          globalStyles.containerPadding,
          globalStyles.screenBg,
          { height: globalConstants.SCREEN_HEIGHT }
        ]}
      >
        <Header />
        <SearchArea navigation={navigation} />
        <Categories navigation={navigation} />
        <TopTrips navigation={navigation} />
        <ExploreButton navigation={navigation} />
      </Layout>
    </SafeAreaView>
  );
};

export default Home;


const styles = StyleSheet.create( {
  exporeBtn: {
    backgroundColor: "#000",
    borderWidth: 0
  }
} );
