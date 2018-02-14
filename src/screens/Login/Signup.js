import React, { Component } from 'react';
import { View, Image, Text, KeyboardAvoidingView, ScrollView, StyleSheet } from 'react-native';
import SignupForm from './SignupForm';

export default class Signup extends Component {
  render(){
    return(
      <ScrollView>
        <KeyboardAvoidingView behavior = "padding" style = {styles.container}>
          <Image
            style = {styles.background}
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
            <SignupForm />
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
  background: {
    position: 'absolute'
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 50
  },
  logo: {
    width: 150,
    height: 150
  },
  box: {
    opacity: 0.5,
    position: 'absolute',
    height: 400
  },
  formContainer: {
    paddingVertical: 15
  }
});
