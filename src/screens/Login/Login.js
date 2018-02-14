import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Image, Text, KeyboardAvoidingView, ScrollView, Alert, Platform, TouchableOpacity, StyleSheet } from 'react-native';
//import Icon from 'react-native-vector-icons/Ionicons';
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
    return (
      <ScrollView>
        <KeyboardAvoidingView behavior = "padding" style = {styles.container}>
          <View>
            <Image
              style = {styles.backgroundContainer}
              source = {require('../../img/splashbackground.jpg')}
            />
            <View style = {styles.logoContainer}>
              <Image
                style = {styles.logo}
                source ={require('../../img/AWM.png')}
              />
            </View>
            <View style = {styles.formContainer}>
              <Image
                style = {styles.box}
                source = {require('../../img/box.png')}
              />
              <LoginForm />
            </View>
          </View>
          <View style = {styles.socMedia}>
            <TouchableOpacity
              name = "google"
              backgroundColor = "#dd4b39"
              onPress={this.loginWithGoogle}
            >
              <Text style = {styles.buttonGoogle}>Google</Text>
            </TouchableOpacity>
            <TouchableOpacity
              name = "facebook"
              backgroundColor = "#3b5998"
              onPress = {this.loginWithFacebook}
            >
              <Text style = {styles.buttonFb}>Facebook</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  backgroundContainer: {
    position: 'absolute'
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 80
  },
  logo: {
    width: 150,
    height: 150
  },
  avatarImg: {
    borderRadius: 50,
    height: 100,
    width: 100
  },
  box: {
    opacity: 0.5,
    position: 'absolute',
    height: 400
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
  socMedia: {
    paddingVertical: 15,
    flexDirection: 'row'
  },
  buttonGoogle: {
    height: 35,
    backgroundColor: '#bf1313',
    paddingVertical: 8,
    borderRadius: 50,
    width: 140,
    color: '#fff',
    marginRight: 40,
    textAlign: 'center'
  },
  buttonFb: {
    height: 35,
    backgroundColor: '#2d47a9',
    paddingVertical: 8,
    borderRadius: 50,
    width: 140,
    color: '#fff',
    textAlign: 'center'
  }
});
