import React, { Component } from 'react';
import { Text, StyleSheet } from 'react-native';
import { DrawerNavigator, DrawerItems, StackNavigator, TabNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';

import Signup from './src/screens/Login/Signup';
import Login from './src/screens/Login/Login';
import LoginForm from './src/screens/Login/LoginForm';
import TouristList from './src/screens/TouristList';
import Modal from './src/screens/Modal';
import Drawer from './src/components/Drawer';
import HeaderButton from './src/components/HeaderButton';
import Restaurant from './src/screens/FoodAdventures/Restaurant';
import New from './src/screens/FoodAdventures/AddRestaurant';
import Attraction from './src/screens/Tourista/Attraction';
import List from './src/screens/List';
import ReviewList from './src/screens/Reviews/ReviewList';
import Map from './src/screens/MapView/Map';
import About from './src/screens/About';

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
    screen: Map,
    navigationOptions: {
      tabBarLabel: 'Map',
      tabBarIcon: ({ tintColor, focused }) => <Icon
        name = {focused ? 'ios-settings' : 'ios-settings-outline'}
        size = {25}
        style = {{ color: tintColor }}
      />
    },
  },
}, {
  tabBarOptions: {
    style: {
      backgroundColor: '#A470F7',
      paddingTop: 15
    }
  }
});

//nest tabnav to drawernav
const TabsWithDrawerNavigation = DrawerNavigator({
  Tabs: {
    screen: TabNavigation,
  },
  HeaderButton: {
    screen: HeaderButton
  },
  About: {
    screen: About
  },
  New: {
    screen: New
  },
}, {
  contentComponent: props => <Drawer {...props} />
});

export const SignedOut = StackNavigator({
  Signup: {
    screen: Signup,
  },
  Login: {
    screen: Login,
  },
  LoginForm: {
    screen: LoginForm
  }
});

//stack with stacknav
export const SignedIn = StackNavigator({
  Login: {
    screen: Login,
  },
  // LoginForm: {
  //   screen: LoginForm
  // },
  TabsWithDrawer: {
    screen: TabsWithDrawerNavigation,
  },
  Restaurant: {
    screen: Restaurant
  },
  Map: {
    screen: Map
  },
  Attraction: {
    screen: Attraction
  },
  Modal: {
    screen: Modal
  },
}, {
  mode: 'modal',
  headerMode: 'none'
});
