import React, { Component } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import HeaderButton from '../components/HeaderButton';

export default class Modal extends Component {
  render(){
    const { goBack } = this.props.navigation;
    return (
      <View style = {styles.container}>
        <HeaderButton
          icon = "md-close"
          onPress = {() => goBack()}
        />
        <Text style = {styles.header}>Hi, this is a modal.</Text>
        <Button
          onPress = {() => goBack()}
          title = "Close Me"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  header: {
    fontSize: 20,
    marginVertical: 20
  }
});
