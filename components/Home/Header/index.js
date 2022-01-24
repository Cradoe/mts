import React from "react";
import { Text, Icon } from "@ui-kitten/components";
import { Image, StyleSheet, View } from "react-native";
import { userAvatar } from "../../../shared/generalAssets";
import { globalStyles } from "../../../shared/globalStyles";
import { globalConstants } from "../../../constants";
import { connect } from "react-redux";


const mapStateToProps = ( state ) => {
  return { user: state.user };
};
export const HeaderComp = ( { user } ) => {
  return (
    <>
      <View
        style={[
          globalStyles.flexRow,
          globalStyles.justifySpaceBetween,
          globalStyles.mt30
        ]}
      >
        <View style={[ globalStyles.flexRow, globalStyles.alignCenter ]}>
          <Image source={userAvatar} style={[ styles.avatar ]} />
          <Text style={globalStyles.fontMedium}>
            Hi, <Text>{user.firstname}!</Text>
          </Text>
        </View>
        <Icon
          style={[ styles.icon ]}
          fill={globalConstants.PRIMARY_COLOR}
          name="bell-outline"
        />
      </View>
    </>
  );
};

export const Header = connect( mapStateToProps )( HeaderComp );

const styles = StyleSheet.create( {
  avatar: {
    height: 30,
    width: 30,
    marginRight: 20
  },
  icon: {
    width: 25,
    height: 25
  }
} );
