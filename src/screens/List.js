import React, { Component, PropTypes } from 'react';
import { View, RefreshControl, ScrollView, StyleSheet } from 'react-native';
import { get, put } from '../../api';
import HomeScreen from './HomeScreen';
import Restaurant from './FoodAdventures/Restaurant';


export default class List extends Component {

  state = {
    popupIsOpen: false,
    restaurants: [], //restaurant array fetched from backend
    refreshing: true
  };

  openRestaurant = (restaurant) => {
    this.setState({
      popupIsOpen: true,
      restaurant
    });
  }

  closeRestaurant = () => {
    this.setState({
      popupIsOpen: false
    });
  }

  //fetch restaurant list when component is about to be mounted
  componentWillMount = () => this.fetchRestaurants();

  componentWillUnMount = () => this.fetchRestaurants.remove();

  //refetch restaurants when user pulls list down
  onRefresh = () => this.fetchRestaurants();

  //api call for fetching restaurants
  fetchRestaurants = async () => {
    this.setState({ refreshing: true });
    try{
      //make api call
      const response = await get('restaurants');
      //convert response to json
      const json = await response.json();
      this.setState({
        refreshing: false,
        restaurants: json.restaurants
      });
    }catch(err){
      alert(err);
    }
  };

  render(){
    const { restaurants } = this.state;
    return (
      <View style = {styles.container}>
        <ScrollView
          ref = {(scrollView) => { this._scrollView = scrollView; }}
          refreshControl = {
            <RefreshControl
              refreshing = {this.state.refreshing}
              onRefresh = {this.onRefresh}
            />
          }
        >
          {/*Render each resto with restaurant component*/}
          {restaurants.map((restaurant, index) => <HomeScreen
            restaurant = {restaurant}
            onOpen = {this.openRestaurant}
            key = {index} />
          )}
        </ScrollView>
        <Restaurant
          restaurant = {this.state.restaurant}
          isOpen = {this.state.popupIsOpen}
          onClose = {this.closeRestaurant}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 20
  }
});
