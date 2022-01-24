import React, { useEffect, useState } from "react";
import { Layout } from "@ui-kitten/components";
import { SafeAreaView } from "react-native";
import { globalStyles } from "../../shared/globalStyles";
import { ListLandmarks } from "../../components/ExploreLandmarks";
import { ScrollView } from "react-native-gesture-handler";

const ExploreLandmarks = ({ navigation }) => {
  const [title, setTitle] = useState("Expore Most Visited");

  useEffect(() => {
    navigation.setOptions({ title: title });
    return () => {};
  }, [title]);

  return (
    <SafeAreaView>
      <Layout style={[globalStyles.containerPadding, globalStyles.screenBg]}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <ListLandmarks navigation={navigation} />
        </ScrollView>
      </Layout>
    </SafeAreaView>
  );
};
export default ExploreLandmarks;
