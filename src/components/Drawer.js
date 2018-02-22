import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default class Drawer extends Component {
  render(){
    const { navigate } = this.props.navigation;
    return(
      <View style = {styles.container}>
        <View style = {styles.head}>
          <Icon name = "ios-contact-outline" size = {100} color="rgba(0,0,0,.09)" />
          <Text style = {styles.header}>Aye! Wander Malolos</Text>
        </View>
        <TouchableOpacity
          onPress = {() => navigate('Modal')}
          style = {styles.button}
        >
          <Text style = {styles.font}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style = {styles.button}
          onPress = {() => navigate('Drawer Close')}
        >
          <Text style = {styles.font}>About</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style = {styles.button}
          onPress = {() => navigate('Settings')}
        >
          <Text style = {styles.font}>Upcoming Events</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style = {styles.button}
          onPress = {() => navigate('Drawer Close')}
        >
          <Text style = {styles.font}>My Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style = {styles.button}
          onPress = {() => navigate('Drawer Close')}
        >
          <Text style = {styles.font}>My Bookmarks</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style = {styles.button}
          onPress = {() => navigate('Drawer Close')}
        >
          <Text style = {styles.font}>My Establishments</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style = {styles.button}
          onPress = {() => navigate('Drawer Close')}
        >
          <Text style = {styles.font}>Add a Place</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style = {styles.button}
          onPress = {() => navigate('Drawer Close')}
        >
          <Text style = {styles.font}>Contact Us</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style = {styles.button}
          onPress = {() => navigate('Drawer Close')}
        >
          <Text style = {styles.font}>Settings</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style = {styles.button}
          onPress = {() => navigate('Login')}
        >
          <Text style = {styles.font}>Log Out</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F5FA',
    //alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
  },
  head: {
    backgroundColor: '#A470F7',
    padding: 20,
    margin: -20
  },
  header: {
    fontSize: 20,
    marginVertical: 20,
    fontWeight: 'bold',
    fontFamily: 'Roboto',
    color: '#fff'
  },
  font: {
    fontFamily: 'Roboto'
  }
});
