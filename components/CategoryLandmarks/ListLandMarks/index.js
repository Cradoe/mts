import React from "react";
import { Text, Layout, Card } from "@ui-kitten/components";
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

export const ListLandmarks = ({ navigation }) => {
  const viewLandMarkDetails = () => {
    navigation.navigate("LandmarkDetails");
  };
  return (
    <View>
      {categoryLists.map((categoryList, index) => {
        return (
          <View key={index}>
            <View style={{ width: "100%" }}>
              <Text category="h3"> {categoryList.heading} </Text>
            </View>
            <View
              style={[
                globalStyles.flexRow,
                globalStyles.justifySpaceBetween,
                { flexWrap: "wrap" }
              ]}
            >
              {categoryList.items.map((category, index) => (
                <TouchableWithoutFeedback
                  onPress={viewLandMarkDetails}
                  key={index}
                >
                  <Layout
                    style={[styles.itemBox, globalStyles.shadowBox]}
                    level="3"
                  >
                    <Image source={category.image} style={styles.thumb}></Image>
                    <View style={[styles.caption, globalStyles.centerCenter]}>
                      <Text>{category.name}</Text>
                    </View>
                  </Layout>
                </TouchableWithoutFeedback>
              ))}
            </View>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
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
});
