import React, { Component, PropTypes } from 'react';
import { View, RefreshControl, ScrollView, StyleSheet } from 'react-native';
import { get, put } from '../../api';
import TouristScreen from './TouristScreen';
import Attraction from './Tourista/Attraction';
import { SearchBar } from 'react-native-elements';

export default class TouristList extends Component {
  // static propTypes = {
  //
  // };

  state = {
    popupIsOpen: false,
    attractions: [], //attraction array fetched from backend
    refreshing: true
  };

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

  openAttraction = (attraction) => {
    this.setState({
      popupIsOpen: true,
      attraction
    });
  }

  closeAttraction = () => {
    this.setState({
      popupIsOpen: false
    });
  }

  //fetch attraction list when component is about to be mounted
  componentWillMount = () => this.fetchAttractions();

  //refetch attractions when user pulls list down
  onRefresh = () => this.fetchAttractions();

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

  render(){
    const { attractions } = this.state;
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
          {/*Render each resto with attraction component*/}
          {attractions.map((attraction, index) => <TouristScreen
            attraction = {attraction}
            onOpen = {this.openAttraction}
            key = {index} />
          )}
        </ScrollView>
        <Attraction
          attraction = {this.state.attraction}
          isOpen = {this.state.popupIsOpen}
          onClose = {this.closeAttraction}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    //paddingTop: 20
  }
});
