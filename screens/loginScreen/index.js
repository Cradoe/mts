import React, { useEffect, useState } from "react";
import {
  Button,
  Input,
  Layout,
  Text,
  Icon,
  Spinner
} from "@ui-kitten/components";
import { globalStyles } from "../../shared/globalStyles";
import { Formik } from "formik";
import * as yup from "yup";
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  SafeAreaView
} from "react-native";
import { useDispatch, connect } from "react-redux";
import { globalConstants } from "../../constants";
import BackgroundImage from "../../components/BackgroundImage";
import { loginScreenBg } from "../../shared/generalAssets";
import { loginModel } from "../../models/loginModel";


const mapStateToProps = ( state ) => {
  return { user: state.user };
};


const Login = ( { navigation, user } ) => {
  const [ secureTextEntry, setSecureTextEntry ] = useState( true ),
    [ responseMessage, setResponseMessage ] = useState( null ),
    [ isSubmitting, setIsSubmitting ] = useState( false ),
    toggleSecureEntry = () => {
      setSecureTextEntry( !secureTextEntry );
    },
    renderIcon = ( props ) => (
      <TouchableWithoutFeedback onPress={toggleSecureEntry}>
        <Icon {...props} name={secureTextEntry ? "eye-off" : "eye"} />
      </TouchableWithoutFeedback>
    ),
    formSchema = yup.object( {
      email: yup
        .string( "Email Address must be valid." )
        .required( "Email Address is required." ),
      password: yup
        .string()
        .min( 3, "Password must more than 3 characters." )
        .required( "Password is required." )
    } ),
    dispatch = useDispatch(),
    successCallback = () => {
      setIsSubmitting( false );
      navigation.navigate( "HomeScreen" );
    },
    errorCallback = ( error ) => {
      setIsSubmitting( false );
      setResponseMessage( error );
    },
    callback = {
      success: successCallback,
      error: errorCallback
    },
    onSubmit = ( data ) => {
      setIsSubmitting( true );
      setResponseMessage( null );
      dispatch( loginModel( data, callback ) );
    },
    LoadingIndicator = ( props ) => (
      <View style={[ props.style, styles.indicator ]}>
        {isSubmitting === true ? <Spinner size="small" /> : null}
      </View>
    );
  useEffect( () => {
    if ( user && user.isLoggedIn ) {
      navigation.navigate( "HomeScreen" );
    }
  }, [] )

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Layout style={[ globalStyles.fullHeight, globalStyles.centerCenter ]}>
        <BackgroundImage
          source={loginScreenBg}
          height={globalConstants.SCREEN_HEIGHT}
          width={globalConstants.SCREEN_WIDTH}
          headerSize={0}
        >
          <View style={[ globalStyles.fullHeight, globalStyles.centerCenter ]}>
            <View style={{ width: "80%" }}>
              <View style={[ styles.heading ]}>
                <Text
                  style={[
                    globalStyles.textWhite,
                    globalStyles.fontAltBold,
                    { fontSize: 30 }
                  ]}
                >
                  Login
                </Text>
                <Text
                  style={[ globalStyles.textWhite, globalStyles.fontRegular ]}
                >
                  A better way to tour!
                </Text>
              </View>
              <View style={styles.formSection}>
                <Formik
                  validationSchema={formSchema}
                  initialValues={{
                    email: "",
                    password: ""
                  }}
                  onSubmit={( details ) => {
                    onSubmit( details );
                  }}
                >
                  {( props ) => (
                    <>
                      {responseMessage ? <Text style={globalStyles.textSecondary}>{responseMessage}</Text> : null}
                      <View style={[ globalStyles.formGroup ]}>
                        <Input
                          placeholder="Valid Email"
                          label="Email Address"
                          keyboardType="email-address"
                          onChangeText={props.handleChange( "email" )}
                          value={props.values.email}
                          style={[
                            globalStyles.formControl,
                            globalStyles.bgTransparent,
                            globalStyles.noBorder
                          ]}
                          textStyle={globalStyles.textWhite}
                          status={
                            props.values.email == "" && props.errors.email
                              ? "danger"
                              : "control"
                          }
                        />
                      </View>
                      <View style={[ globalStyles.formGroup ]}>
                        <Input
                          label="Password"
                          placeholder="***"
                          accessoryRight={renderIcon}
                          secureTextEntry={secureTextEntry}
                          onChangeText={props.handleChange( "password" )}
                          value={props.values.password}
                          style={[
                            globalStyles.formControl,
                            globalStyles.bgTransparent,
                            globalStyles.noBorder
                          ]}
                          status={
                            props.values.password == "" &&
                              props.errors.password
                              ? "danger"
                              : "control"
                          }
                          textStyle={globalStyles.textWhite}
                        />
                      </View>
                      <View style={[ globalStyles.formGroup ]}>
                        <Button
                          disabled={isSubmitting ? true : false}
                          onPress={props.handleSubmit}
                          style={[ globalStyles.btn, globalStyles.bgWhite ]}
                          accessoryLeft={
                            isSubmitting === true ? LoadingIndicator : null
                          }
                        >
                          <Text style={globalStyles.textPrimary}>Login</Text>
                        </Button>

                      </View>
                    </>
                  )}
                </Formik>
              </View>
            </View>
          </View>
        </BackgroundImage>
      </Layout>
    </SafeAreaView>
  );
};

const LoginScreen = connect( mapStateToProps )( Login );

export default LoginScreen;


const styles = StyleSheet.create( {
  formSection: {
    marginTop: 140,
    maxWidth: ( globalConstants.SCREEN_WIDTH * 80 ) / 100,
    backgroundColor: "rgba(0,0,0,.6)",
    padding: 20,
    borderRadius: 10
  }
} );
