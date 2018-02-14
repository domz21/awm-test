import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Image, Text, TextInput, KeyboardAvoidingView, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';

export default class Input extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired
  };
  state = {
    text: undefined //user input
  };
  onChangeText = (text) => this.setState({ text }); //update state when input changes
  onSubmitEditing = ({ nativeEvent: { text } }) => this.setState({ text}, this.submit);

  //pass a review
  submit = () => {
    const { text } = this.state;
    if(text){
      this.setState({ text: undefined }, () => this.props.onSubmit(text));
    }else{
      alert('Please enter a review before submitting');
    }
  };

  render(){
    return(
      <KeyboardAvoidingView behavior='padding'>
        <View style = {styles.container}>
          <TextInput
            placeholder = "Add a review..."
            autoFocus = {true}
            style = {styles.input}
            value = {this.state.text}
            onChangeText = {this.onChangeText}
            onSubmitEditing = {this.onSubmitEditing}
          />
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    flexDirection: 'row',
    borderTopWidth: 1,
    borderColor: '#EEE',
    alignItems: 'center',
    paddingLeft: 15,
  },
  input: {
    flex: 1,
    height: 40,
    fontSize: 15,
  },
  button: {
    height: 40,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inactive: {
    color: '#CCC',
  },
  text: {
    color: '#3F51B5',
    fontWeight: 'bold',
    fontFamily: 'Avenir',
    textAlign: 'center',
    fontSize: 15,
  },
});
