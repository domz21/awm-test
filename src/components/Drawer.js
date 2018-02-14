import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default class Drawer extends Component {
  render(){
    const { navigate } = this.props.navigation;
    return(
      <View style = {styles.container}>
        <Text style = {styles.header}>Aye! Wander Malolos</Text>
        <TouchableOpacity
          onPress = {() => navigate('Modal')}
          style = {styles.button}
        >
          <Text>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style = {styles.button}
          onPress = {() => navigate('Drawer Close')}
        >
          <Text>About</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style = {styles.button}
          onPress = {() => navigate('Settings')}
        >
          <Text>Travel</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style = {styles.button}
          onPress = {() => navigate('Drawer Close')}
        >
          <Text>My Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style = {styles.button}
          onPress = {() => navigate('Drawer Close')}
        >
          <Text>My Bookmarks</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style = {styles.button}
          onPress = {() => navigate('Drawer Close')}
        >
          <Text>My Establishments</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style = {styles.button}
          onPress = {() => navigate('Drawer Close')}
        >
          <Text>My History</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style = {styles.button}
          onPress = {() => navigate('Drawer Close')}
        >
          <Text>Contact Us</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style = {styles.button}
          onPress = {() => navigate('Drawer Close')}
        >
          <Text>Settings</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style = {styles.button}
          onPress = {() => navigate('Drawer Close')}
        >
          <Text>Log Out</Text>
        </TouchableOpacity>
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
