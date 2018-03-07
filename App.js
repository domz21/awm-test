import React, { Component } from 'react';
import { Text, StyleSheet } from 'react-native';
import { DrawerNavigator, StackNavigator, TabNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';

// import HomeScreen from './src/screens/HomeScreen';
import { SignedOut, SignedIn } from './router';
import TouristList from './src/screens/TouristList';
import Modal from './src/screens/Modal';
import Drawer from './src/components/Drawer';
import Restaurant from './src/screens/FoodAdventures/Restaurant';
import List from './src/screens/List';
import ReviewList from './src/screens/Reviews/ReviewList';
import TouristReviewList from './src/screens/Reviews/TouristReviewList';
import Login from './src/screens/Login/Login';


export default class App extends React.Component {
  state = {
    user: undefined
  };

  onLoggedIn = (user) => {
    this.setState({ user });
  };

  render(){
    // const { user } = this.state;
    // return user
    //   ?<Reviews user = {user} />
    //   :<Login onLoggedIn = {this.onLoggedIn} />;
    return(
      <SignedIn />
    );
  }
}
