import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Platform } from 'react-native';
import { MapView, Constants, Location, Permissions } from 'expo';
import { get, put } from '../../../api';
import Callout from './Callout';
//import Restaurant from '../FoodAdventures/Restaurant';

export default class Map extends Component {

  state = {
    places: [], //all establishments array fetched from backend
    //attractions: [],
    showRestaurantsOnly: false,
    popupIsOpen: false,
    refreshing: true,
    location: null,
    errorMessage: null
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
    this.fetchPlaces();
    this._getLocationAsync();
    //this.fetchAttractions();
  };

  //api call for fetching restaurants
  fetchPlaces = async () => {
    this.setState({ refreshing: true });
    try{
      //make api call
      const response = await get('places');
      //convert response to json
      const json = await response.json();
      this.setState({
        refreshing: false,
        places: json.places
      });
    }catch(err){
      alert(err);
    }
  };

  _getLocationAsync = async () => {
    let { status }  = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted'){
      this.setState({
        errorMessage: 'Permission to access location was denied'
      });
    }
    let location = await Location.getCurrentPositionAsync({});
    this.setState({ location });
  };

  //api call for fetching attractions
  // fetchAttractions = async () => {
  //   this.setState({ refreshing: true });
  //   try{
  //     //make api call
  //     const response = await get('attractions');
  //     //convert response to json
  //     const json = await response.json();
  //     this.setState({
  //       refreshing: false,
  //       attractions: json.attractions
  //     });
  //   }catch(err){
  //     alert(err);
  //   }
  // };

  render() {
    const { places } = this.state;
    //const { navigate } = this.props.navigation;
    let text = 'Waiting...';
    if(this.state.errorMessage){
      text = this.state.errorMessage;
    } else if (this.state.location){
      text = JSON.stringify(this.state.location);
    }
    return (
      <View style={styles.container}>
        {/* Map*/}
        <MapView
          style={styles.map}
          //Position on Malolos, Bulacan
          initialRegion={{
            latitude: 14.8527393,
            longitude: 120.81603760000007,
            latitudeDelta: 0.0491,
            longitudeDelta: 0.0375,
          }}
        >
          {/* Loop through places and add pins on the map */}
          {places.map((place, index) => <MapView.Marker
              coordinate={{
                latitude: place.coordinate[0],
                longitude: place.coordinate[1],
              }}
              calloutOffset = {{ x: -8, y: 5 }}
              // Green color for restaurants and red for tourist spots
              //pinColor='#009688'
              pinColor={place.restaurant ? '#009688' : '#f44336'}
              key={index}
            >
              <MapView.Callout tooltip style = {styles.callout}>
                <Callout
                  name = {place.name}
                  image = {place.image}
                />
              </MapView.Callout>
            </MapView.Marker>
          )}
        </MapView>
        {/* Button */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            // Toggle this.state.showRestaurantsOnly
            onPress={() => this.setState({
              showRestaurantsOnly: !this.state.showRestaurantsOnly
            })}
          >
            <Text>{text}</Text>
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
