import React, { useEffect, useState } from "react";
import { Layout, Text } from "@ui-kitten/components";
import { Image, SafeAreaView, View, StyleSheet } from "react-native";
import { globalStyles } from "../../shared/globalStyles";
import { ScrollView } from "react-native-gesture-handler";
import { globalConstants } from "../../constants";
import { VisitLandmarkButton } from "../../components/LandmarkDetails";

const LandmarkDetails = ( { navigation, route } ) => {
  const [ title, setTitle ] = useState( "Expore Most Visited" );
  const { landmark } = route.params;

  useEffect( () => {
    navigation.setOptions( { title: title } );
    return () => { };
  }, [ title ] );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Layout style={[ globalStyles.screenBg, styles.container ]}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ maxHeight: "91%" }}
        >
          <View style={{ position: "relative" }}>
            <Image source={{ uri: landmark.image }} style={[ styles.thumbnail ]} />
            <View style={styles.titleOverlay}>
              <Text
                category="h5"
                style={[ globalStyles.textWhite, globalStyles.textBold ]}
              >
                {landmark.title}
              </Text>
            </View>
          </View>
          <View style={globalStyles.mt20}>
            <Text
              category="h5"
              style={[ globalStyles.textBold, globalStyles.textSecondary ]}
            >
              Overview
            </Text>
            <Text style={[ globalStyles.textGray ]}>
              {landmark.description}
            </Text>
          </View>
        </ScrollView>
        <VisitLandmarkButton landmark={landmark} navigation={navigation} />
      </Layout>
    </SafeAreaView>
  );
};
export default LandmarkDetails;

const styles = StyleSheet.create( {
  container: {
    padding: 10
  },
  thumbnail: {
    width: "100%",
    height: globalConstants.SCREEN_HEIGHT * ( 60 / 100 ),
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84
  },
  titleOverlay: {
    position: "absolute",
    bottom: 0,
    padding: 20,
    backgroundColor: "rgba(0,0,0,0.3)",
    width: "100%",
    borderRadius: 20,
    height: "100%",
    justifyContent: "flex-end"
  }
} );
