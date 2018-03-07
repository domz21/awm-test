import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Image, ImageBackground, Text, KeyboardAvoidingView, ScrollView, Alert, Platform, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Facebook, Google, AuthSession } from 'expo';
import { StackNavigator } from 'react-navigation';
import LoginForm from './LoginForm';

const FB_APP_ID = '401713836954078';

export default class Login extends Component {
  state = {
    userInfo: null,
  };
  // constructor(props){
  //   super(props);
  //   this.state = { userInfo: null };
  // }
  //
  loginWithFacebook = async () => {
    const { type, token } = await Facebook.logInWithReadPermissionsAsync('401713836954078', {
        permissions: ['public_profile', 'email'],
      });
    if (type === 'success') {
      // Get the user's name using Facebook's Graph API
      const response = await fetch(
        `https://graph.facebook.com/me?access_token=${token}&fields=id,name,picture`);
      const userInfo = await response.json();
      this.setState({ userInfo: userInfo });
      this.props.navigation.navigate(
        'TabsWithDrawer',
        { userInfo }
      );
      // Alert.alert(
      //   'Logged in!',
      //   `Hi ${(await response.json()).name}!`,
      // );
    }
  }

  loginWithGoogle = async () => {
    try {
      const { type, token } = await Google.logInAsync({
        androidClientId: '530288504325-lb7c89r2kh89lrf31i335u4erdjqcbqq.apps.googleusercontent.com',
        iosClientId: '530288504325-kjjcimv9ei7v2946s90t0cfrcortt9n1.apps.googleusercontent.com',
        scopes: ['profile', 'email'],
      });

      if (type === 'success') {
        //this.props.navigation.navigate('TabsWithDrawer', { userInfo });
        //return result.accessToken;
        //return result.
        const response = await fetch(
          `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${token}`);
        const userInfo = await response.json();
        this.setState({ userInfo: userInfo });
        // this.props.navigation.navigate(
        //   'TabsWithDrawer',
        //   { userInfo }
        // );
      } else {
        return {cancelled: true};
      }
    } catch(e) {
      return {error: true};
    }
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <ScrollView>
        <KeyboardAvoidingView behavior = "padding" style = {styles.container}>
          <View>
            <ImageBackground
              style = {styles.backgroundContainer}
              source = {require('../../img/splash.jpg')}
            >
              <View style = {styles.logoContainer}>
                <Image
                  style = {styles.logo}
                  source ={require('../../../assets/logo2.png')}
                />
              </View>
              <View style = {styles.formContainer}>

                <View style = {styles.connect}><Text style = {styles.label}>Log In</Text></View>
                <View style = {styles.socMedia}>
                  <TouchableOpacity
                    name = "google"
                    backgroundColor = "#dd4b39"
                    onPress={this.loginWithGoogle}
                  >
                    <Text style = {styles.buttonGoogle}><Icon name = "logo-google" style = {{ fontSize: 18}}></Icon>&nbsp; Continue with Google +</Text>
                  </TouchableOpacity>
                  {this.state.userInfo ? (
                     <Text>{this.state.userInfo.name}</Text>
                   ) : null}
                  <TouchableOpacity
                    name = "facebook"
                    backgroundColor = "#3b5998"
                    onPress = {this.loginWithFacebook}
                  >
                    <Text style = {styles.buttonFb}><Icon name = "logo-facebook" style = {{ fontSize: 20}}></Icon>&nbsp; Continue with Facebook</Text>
                  </TouchableOpacity>

                  {/*<TouchableOpacity

                    onPress = {() => navigate('LoginForm')}
                  >
                    <Text style = {styles.buttonDiff}>Sign In with a Different Account</Text>
                  </TouchableOpacity>*/}
                </View>
              </View>
            </ImageBackground>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    );
  }
  // _handlePressAsync = async () => {
  //   let redirectUrl = AuthSession.getRedirectUrl();
  //   let result = await AuthSession.startAsync({
  //     authUrl:
  //       `https://www.facebook.com/v2.8/dialog/oauth?response_type=token` +
  //       `&client_id=${FB_APP_ID}` +
  //       `&redirect_uri=${encodeURIComponent(redirectUrl)}`,
  //   });
  //   this.setState({ result });
  // };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#A470F7'
  },
  backgroundContainer: {
    //position: 'absolute',
    //flexGrow: 1
    paddingBottom: 110
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 80,
    paddingTop: 170
  },
  logo: {
    width: 150,
    height: 150
  },
  label: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 28,
    paddingTop: 10
  },
  avatarImg: {
    borderRadius: 50,
    height: 100,
    width: 100
  },
  box: {
    opacity: 0.3,
    position: 'absolute',
    paddingBottom: 700
  },
  formContainer: {
    paddingVertical: 15
  },
  buttonContainer: {
    height: 45,
    backgroundColor: '#1b2657',
    paddingVertical: 10,
    borderRadius: 50
  },
  button: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 18
  },
  keepLog: {
    alignItems: 'flex-end',
    paddingVertical: 15,
    flexDirection: 'row-reverse',
    borderBottomColor: '#1b2657',
    borderBottomWidth: 1
  },
  connect: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  socMedia: {
    paddingVertical: 10,
    //flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 150
  },
  buttonGoogle: {
    height: 35,
    backgroundColor: '#bf1313',
    paddingVertical: 8,
    borderRadius: 7,
    width: 300,
    color: '#fff',
    marginBottom: 15,
    textAlign: 'center'
  },
  buttonFb: {
    height: 35,
    backgroundColor: '#2d47a9',
    paddingVertical: 8,
    borderRadius: 7,
    width: 300,
    color: '#fff',
    textAlign: 'center',

  },
  buttonDiff: {
    color: '#fff',
    marginTop: 15,
    paddingBottom: 115
  }
});
