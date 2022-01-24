import React, { useEffect, useState } from "react";
import { Layout } from "@ui-kitten/components";
import { SafeAreaView } from "react-native";
import { globalStyles } from "../../shared/globalStyles";
import { ListLandmarks } from "../../components/CategoryLandmarks";
import { ScrollView } from "react-native-gesture-handler";

const CategoryLandmarks = ({ navigation, route }) => {
  const [title, setTitle] = useState(route.params.title || "");

  useEffect(() => {
    navigation.setOptions({ title: title });
    return () => {};
  }, [title]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Layout style={[globalStyles.containerPadding, globalStyles.screenBg]}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <ListLandmarks navigation={navigation} />
        </ScrollView>
      </Layout>
    </SafeAreaView>
  );
};
export default CategoryLandmarks;
