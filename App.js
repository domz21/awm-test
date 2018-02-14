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
import Login from './src/screens/Login/Login';
import Reviews from './src/screens/Reviews/List';

// const SettingsTab = StackNavigator({
//   Settings: {
//     screen: Settings,
//     navigationOptions: {
//       header: null,
//       headerBackTitle: 'Back'
//     },
//   },
//   Profile: {
//     screen: Profile,
//     navigationOptions: ({ navigation }) => ({
//       title: `${navigation.state.params.user}'s Profile`,
//     }),
//   },
// }, {
//   headerMode: 'screen'
// });

// const TabNavigation = TabNavigator({
//   Home: {
//     screen: List,
//     navigationOptions: {
//       tabBarLabel: 'Food Adventures',
//       tabBarIcon: ({ tintColor, focused }) => <Icon
//         name = {focused ? 'ios-home' : 'ios-home-outline'}
//         size = {25}
//         style = {{ color: tintColor }}
//       />
//     },
//   },
//   AttractionsTab: {
//     screen: TouristList,
//     navigationOptions: {
//       tabBarLabel: 'Tourist Spots',
//       tabBarIcon: ({ tintColor, focused }) => <Icon
//         name = {focused ? 'ios-settings' : 'ios-settings-outline'}
//         size = {25}
//         style = {{ color: tintColor }}
//       />
//     },
//   },
//   Events: {
//     screen: TouristList,
//     navigationOptions: {
//       tabBarLabel: 'Upcoming Events',
//       tabBarIcon: ({ tintColor, focused }) => <Icon
//         name = {focused ? 'ios-settings' : 'ios-settings-outline'}
//         size = {25}
//         style = {{ color: tintColor }}
//       />
//     },
//   },
// });

// //nest tabnav to drawernav
// const TabsWithDrawerNavigation = DrawerNavigator({
//   Tabs: {
//     screen: TabNavigation
//   }
// }, {
//   contentComponent: props => <Drawer {...props} />
// });

// const SignedOut = StackNavigator({
//   Login: {
//     screen: Login,
//   }
// });

//stack with stacknav
// export default StackNavigator({
//   // Login: {
//   //   screen: Login,
//   // },
//   TabsWithDrawer: {
//     screen: TabsWithDrawerNavigation,
//   },
//   Restaurant: {
//     screen: Restaurant
//   },
//   Modal: {
//     screen: Modal
//   },
// }, {
//   mode: 'modal',
//   headerMode: 'none'
// });

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
