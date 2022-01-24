import React from "react";
import { StyleSheet, View, SafeAreaView } from "react-native";
import { globalStyles } from "../../shared/globalStyles";
import { globalConstants } from "../../constants";
import BackgroundImage from "../../components/BackgroundImage";
import { splashScreenBg } from "../../shared/generalAssets";
import { Layout, Text, Button, Icon } from "@ui-kitten/components";

const StarIcon = ( props ) => <Icon {...props} name="arrowhead-right-outline" />;

const SplashScreen = ( { navigation } ) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Layout>
        <BackgroundImage
          source={splashScreenBg}
          height={globalConstants.SCREEN_HEIGHT}
          headerSize={0}
        >
          <View
            style={[
              globalStyles.fullHeight,
              globalStyles.mt40,
              globalStyles.containerPadding,
              { width: ( globalConstants.SCREEN_WIDTH * 50 ) / 100 }
            ]}
          >
            <Text
              style={[
                globalStyles.textDark,
                globalStyles.fontAltBold,
                { fontSize: 30 }
              ]}
            >
              Enjoy
            </Text>
            <Text style={[ { fontSize: 20 } ]}>your visit to Lekki!</Text>
            <Button
              onPress={() => {
                navigation.navigate( "LoginScreen" );
              }}
              accessoryLeft={StarIcon}
              size="small"
              style={[
                styles.ctaButton,
                globalStyles.mt30,
                globalStyles.bgPrimary
              ]}
            ></Button>
          </View>
        </BackgroundImage>
      </Layout>
    </SafeAreaView>
  );
};

export default SplashScreen;

const styles = StyleSheet.create( {
  ctaButton: {
    width: "40%"
  }
} );
