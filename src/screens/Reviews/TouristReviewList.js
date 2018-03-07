import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, RefreshControl, KeyboardAvoidingView, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { get, put } from '../../../api';
import TouristReview from './TouristReview';
import TouristInput from './TouristInput';

export default class TouristReviewList extends Component {
  // static propTypes = {
  //   user: PropTypes.shape({
  //     _id: PropTypes.string.isRequired
  //   }).isRequired,
  // };
  state = {
    tours: [], //reviews array fetched from backend
    refreshing: true
  };
  componentWillMount = () => this.fetchTours();
  onRefresh = () => this.fetchTours(); //refetch reviews when user pulls list down

  //call api to fetch reviews
  fetchTours = async()=> {
    this.setState({ refreshing: true });
    try{
      const response = await get('tours'); //api call
      const json = await response.json(); //convert res to json
      this.setState({
        refreshing: false,
        tours: json.tours
      });
    }
    catch(e){
      alert(e);
    }
  };

  //submit new review
  submitReview = async(tour)=> {
    //const { user } = this.props;
    this._scrollView.scrollTo({ y: 0 });
    try{
      const response = await put('tours', {
        //user_id: user._id,
        content: tour
      });
      const json = await response.json();
      this.setState({
        tours: [json.tour, ...this.state.tours] //put reviews on top of existing ones
      });
    }
    catch(e){
      alert(e);
    }
  };

  render(){
    const { tours } = this.state;
    //const { navigate } = this.props.navigation;
    return(
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
          {tours.map((tour, index)=> <TouristReview tour = {tour} key = {index} />)}
        </ScrollView>
        <TouristInput onSubmit = {this.submitReview} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingTop: 20,
  }
});
