import React from "react";
import { Button, Icon } from "@ui-kitten/components";
import { StyleSheet } from "react-native";
import { globalStyles } from "../../../shared/globalStyles";

const naviagationIcon = (props) => (
  <Icon {...props} name="navigation-2-outline" />
);

export const ExploreButton = ({ navigation }) => {
  return (
    <Button
      onPress={() => {
        navigation.navigate("ExploreLandmarks");
      }}
      style={[globalStyles.mt20, styles.exporeBtn]}
      accessoryRight={naviagationIcon}
    >
      Explore
    </Button>
  );
};

const styles = StyleSheet.create({
  exporeBtn: {
    backgroundColor: "#000",
    borderWidth: 0
  }
});
