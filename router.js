import React, { Component } from 'react';
import { Text, StyleSheet } from 'react-native';
import { DrawerNavigator, StackNavigator, TabNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';

import Signup from './src/screens/Login/Signup';
import Login from './src/screens/Login/Login';
import TouristList from './src/screens/TouristList';
import Modal from './src/screens/Modal';
import Drawer from './src/components/Drawer';
import Restaurant from './src/screens/FoodAdventures/Restaurant';
import List from './src/screens/List';

const TabNavigation = TabNavigator({
  Home: {
    screen: List,
    navigationOptions: {
      tabBarLabel: 'Food Adventures',
      tabBarIcon: ({ tintColor, focused }) => <Icon
        name = {focused ? 'ios-home' : 'ios-home-outline'}
        size = {25}
        style = {{ color: tintColor }}
      />
    },
  },
  AttractionsTab: {
    screen: TouristList,
    navigationOptions: {
      tabBarLabel: 'Tourist Spots',
      tabBarIcon: ({ tintColor, focused }) => <Icon
        name = {focused ? 'ios-settings' : 'ios-settings-outline'}
        size = {25}
        style = {{ color: tintColor }}
      />
    },
  },
  Events: {
    screen: TouristList,
    navigationOptions: {
      tabBarLabel: 'Upcoming Events',
      tabBarIcon: ({ tintColor, focused }) => <Icon
        name = {focused ? 'ios-settings' : 'ios-settings-outline'}
        size = {25}
        style = {{ color: tintColor }}
      />
    },
  },
});

//nest tabnav to drawernav
const TabsWithDrawerNavigation = DrawerNavigator({
  Tabs: {
    screen: TabNavigation
  }
}, {
  contentComponent: props => <Drawer {...props} />
});

export const SignedOut = StackNavigator({
  Signup: {
    screen: Signup,
  },
  Login: {
    screen: Login,
  }
});

//stack with stacknav
export const SignedIn = StackNavigator({
  Login: {
    screen: Login,
  },
  TabsWithDrawer: {
    screen: TabsWithDrawerNavigation,
  },
  Restaurant: {
    screen: Restaurant
  },
  Modal: {
    screen: Modal
  },
}, {
  mode: 'modal',
  headerMode: 'none'
});
