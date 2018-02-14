import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';

export default class SignupForm extends Component{
  render(){
    return(
      <View style = {styles.container}>

        <Text style = {styles.label}>EMAIL</Text>
        <TextInput
          keyboardType = "email-address"
          autoCapitalize = "none"
          style = {styles.input}
         />
        <Text style = {styles.label}>NAME</Text>
        <TextInput
         style = {styles.input}
        />
        <Text style = {styles.label}>PASSWORD</Text>
        <TextInput
          secureTextEntry
          style = {styles.input}
        />
        <Text style = {styles.label}>RE-TYPE PASSWORD</Text>
        <TextInput
          secureTextEntry
          style = {styles.input}
        />
        <TouchableOpacity style = {styles.buttonContainer}>
          <Text style = {styles.button}>Sign Up</Text>
        </TouchableOpacity>



      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 20
  },
  input: {
    height: 40,
    marginBottom: 10,
    color: '#1b2657',
    paddingHorizontal: 10
  },
  label: {
    color: '#1b2657',
    fontWeight: 'bold'
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
  }
});
