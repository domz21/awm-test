import React, { Component, PropTypes } from 'react';
import { View, RefreshControl, ScrollView, TextInput, StyleSheet } from 'react-native';
//import SearchInput, { createFilter } from 'react-native-search-filter';
import { get, put } from '../../api';
import HomeScreen from './HomeScreen';
import Restaurant from './FoodAdventures/Restaurant';
import { SearchBar } from 'react-native-elements';

const KEYS_TO_FILTERS = ['name', 'type'];


export default class List extends Component {
  constructor() {
    super();
    this.state = {
      restaurants: [],
      dataBackup: [],
      popupIsOpen: false,
      refreshing: true
    }
  }
  setSearchText(event){
    searchText = event.nativeEvent.text;
    restaurants = this.state.dataBackup;
    searchText = searchText.trim().toLowerCase();

    restaurants = restaurants.filter(restaurant => {
      restaurant.name.match( searchText );
    });
    this.setState({
      restaurants: restaurants
    });
  }

  // state = {
  //   popupIsOpen: false,
  //   restaurants: [], //restaurant array fetched from backend
  //   refreshing: true
  // };

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
      //alert(err);
    }
  };

  render(){
    const { restaurants } = this.state;
    //const filteredRestaurants = restaurants.filter(createFilter(this.state.searchTerm, KEYS_TO_FILTERS))
    return (
      <View style = {styles.container}>
        <SearchBar
          lightTheme
          onChange = {this.setSearchText.bind(this)}
          placeholder = 'Type here...'
        />
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
          {/*{filteredRestaurants.map(restaurant => {
            return (
              <TouchableOpacity onPress={()=>alert(restaurant.name)} key={restaurant.id} style={styles.emailItem}>
                <View>
                  <Text>{restaurant.name}</Text>
                  <Text style={styles.emailSubject}>{restaurant.type}</Text>
                </View>
              </TouchableOpacity>
            )
          })}*/}
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
  }
});
