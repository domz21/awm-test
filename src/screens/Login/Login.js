import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Image, Text, KeyboardAvoidingView, ScrollView, Alert, Platform, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Facebook, Google } from 'expo';
import { StackNavigator } from 'react-navigation';
import LoginForm from './LoginForm';

export default class Login extends Component {
  constructor(props){
    super(props);
    this.state = { userInfo: null };
  }

  loginWithFacebook = async () => {
    const { type, token } = await Facebook.logInWithReadPermissionsAsync('401713836954078', {
        permissions: ['public_profile', 'email'],
      });
    if (type === 'success') {
      // Get the user's name using Facebook's Graph API
      const response = await fetch(
        `https://graph.facebook.com/me?access_token=${token}&fields=id,name,picture,type(large)`);
      const userInfo = await response.json();
      this.setState({ userInfo: userInfo });
      this.props.navigation.navigate('TabsWithDrawer');
      // Alert.alert(
      //   'Logged in!',
      //   `Hi ${(await response.json()).name}!`,
      // );
    }
  }

  loginWithGoogle = async () => {
    try {
      const result = await Google.logInAsync({
        androidClientId: '530288504325-lb7c89r2kh89lrf31i335u4erdjqcbqq.apps.googleusercontent.com',
        iosClientId: '530288504325-kjjcimv9ei7v2946s90t0cfrcortt9n1.apps.googleusercontent.com',
        scopes: ['profile', 'email'],
      });

      if (result.type === 'success') {
        this.props.navigation.navigate('TabsWithDrawer');
        return result.accessToken;
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
            <Image
              style = {styles.backgroundContainer}
              source = {require('../../img/splash.jpg')}
            />
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
          </View>

        </KeyboardAvoidingView>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#A470F7'
  },
  backgroundContainer: {
    position: 'absolute',
    flexGrow: 1
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
