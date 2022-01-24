import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { globalConstants } from "../constants";

import SplashScreen from "../screens/spashScreen/";
import LoginScreen from "../screens/loginScreen/";
import HomeScreen from "../screens/homeScreen/";
import CategoryLandmarks from "../screens/categoryLandmarks/";
import ExploreLandmarks from "../screens/exploreLandmarks";
import LandmarkDetails from "../screens/landmarkDetails";
import DirectionMap from "../screens/directionMap";
import SearchResults from "../screens/searchResults";

import { screenOptionStyle } from "./screenOptionStyle";

const Stack = createStackNavigator();

const primaryHeader = {
  headerStyle: {
    backgroundColor: globalConstants.PRIMARY_COLOR,
    elevation: 0, // remove shadow on Android
    shadowOpacity: 0 // remove shadow on iOS
  },
  headerTintColor: "#fff"
},
  lightHeader = {
    headerStyle: {
      backgroundColor: globalConstants.SCREEN_BG
    },
    headerTintColor: globalConstants.PRIMARY_COLOR
  };
export const MainStackNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={screenOptionStyle}>
        <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{ headerShown: false }}
        />



        <Stack.Screen
          name="SearchResults"
          component={SearchResults}
          options={{
            title: "",
            ...lightHeader
          }}
        />

        <Stack.Screen
          name="CategoryLandmarks"
          component={CategoryLandmarks}
          options={{
            title: "",
            ...lightHeader
          }}
        />

        <Stack.Screen
          name="ExploreLandmarks"
          component={ExploreLandmarks}
          options={{
            title: "",
            ...lightHeader
          }}
        />

        <Stack.Screen
          name="LandmarkDetails"
          component={LandmarkDetails}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="DirectionMap"
          component={DirectionMap}
          options={{
            title: "",
            ...lightHeader
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
