import React, { Component, PropTypes } from 'react';
import { View, RefreshControl, ScrollView, StyleSheet } from 'react-native';
import { get, put } from '../../api';
import TouristScreen from './TouristScreen';


export default class TouristList extends Component {
  static propTypes = {

  };

  state = {
    attractions: [], //attraction array fetched from backend
    refreshing: true
  };

  //fetch attraction list when component is about to be mounted
  componentDidMount = () => this.fetchAttractions();

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
        restaurants: json.attractions
      });
    }catch(err){
      alert(err);
    }
  };

  render(){
    const { attractions } = this.state;
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
          {/*Render each resto with attraction component*/}
          {attractions.map((attraction, index) => <TouristScreen attraction = {attraction}
            onPress = {() => {
              this.props.navigation.push({
                name: 'attraction',
                attraction: attraction,
              });
            }}
            key = {index} />
          )}
        </ScrollView>
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
