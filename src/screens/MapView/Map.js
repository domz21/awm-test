import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { MapView } from 'expo';
import { get, put } from '../../../api';
import Callout from './Callout';
//import Restaurant from '../FoodAdventures/Restaurant';

export default class Map extends Component {

  state = {
    restaurants: [], //restaurant array fetched from backend
    attractions: [],
    showGoodOnly: false,
    popupIsOpen: false,
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
  componentWillMount(){
    this.fetchRestaurants();
    this.fetchAttractions();
  };

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

  //api call for fetching attractions
  fetchAttractions = async () => {
    this.setState({ refreshing: true });
    try{
      //make api call
      const response = await get('attractions');
      //convert response to json
      const json = await response.json();
      this.setState({
        refreshing: false,
        attractions: json.attractions
      });
    }catch(err){
      alert(err);
    }
  };

  render() {
    const { restaurants, attractions } = this.state;
    return (
      <View style={styles.container}>
        {/* Map*/}
        <MapView
          style={styles.map}
          // Position on Manhattan, New York
          initialRegion={{
            latitude: 14.8527393,
            longitude: 120.81603760000007,
            latitudeDelta: 0.0491,
            longitudeDelta: 0.0375,
          }}
        >
          {/* Loop through places and add pins on the map */}
          {restaurants.map((restaurant, index) => <MapView.Marker
              coordinate={{
                latitude: restaurant.coordinate[0],
                longitude: restaurant.coordinate[1],
              }}
              calloutOffset = {{ x: -8, y: 28 }}
              // Green color for good characters and red for others
              pinColor='#009688'
              key={index}
            >
              <MapView.Callout tooltip style = {styles.callout}>
                <Callout
                  name = {restaurant.name}
                  type = {restaurant.type}
                />
              </MapView.Callout>
            </MapView.Marker>
          )}
          {/*{attractions.map((attraction, index) => <MapView.Marker
              coordinate={{
                latitude: restaurant.coordinate[0],
                longitude: restaurant.coordinate[1],
              }}
              calloutOffset = {{ x: -8, y: 28 }}
              // Green color for good characters and red for others
              pinColor='#A52665'
              key={index}
            >
              <MapView.Callout tooltip style = {styles.callout}>
                <Callout
                  name = {attraction.name}
                  image = {attraction.image}
                />
              </MapView.Callout>
            </MapView.Marker>
          )}*/}
        </MapView>
        {/* Button */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            // Toggle this.state.showGoodOnly
            onPress={() => this.setState({
              showGoodOnly: !this.state.showGoodOnly
            })}
          >
            <Text>{this.state.showGoodOnly ? 'Show All' : 'Filter'}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  callout: {
    width: 500
  },
  buttonContainer: {
    marginVertical: 20,
  },
  button: {
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.7)',
    borderRadius: 20,
    padding: 12,
    width: 160,
  },
});
