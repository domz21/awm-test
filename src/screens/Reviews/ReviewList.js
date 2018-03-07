import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, RefreshControl, KeyboardAvoidingView, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { get, put } from '../../../api';
import Review from './Review';
import Input from './Input';

export default class ReviewList extends Component {
  // static propTypes = {
  //   user: PropTypes.shape({
  //     _id: PropTypes.string.isRequired
  //   }).isRequired,
  // };
  state = {
    reviews: [], //reviews array fetched from backend
    refreshing: true
  };
  componentWillMount = () => this.fetchReviews();
  onRefresh = () => this.fetchReviews(); //refetch reviews when user pulls list down

  //call api to fetch reviews
  fetchReviews = async()=> {
    this.setState({ refreshing: true });
    try{
      const response = await get('reviews'); //api call
      const json = await response.json(); //convert res to json
      this.setState({
        refreshing: false,
        reviews: json.reviews
      });
    }
    catch(e){
      alert(e);
    }
  };

  //submit new review
  submitReview = async(review)=> {
    //const { user } = this.props;
    this._scrollView.scrollTo({ y: 0 });
    try{
      const response = await put('reviews', {
        //user_id: user._id,
        content: review
      });
      const json = await response.json();
      this.setState({
        reviews: [json.review, ...this.state.reviews] //put reviews on top of existing ones
      });
    }
    catch(e){
      alert(e);
    }
  };

  render(){
    const { reviews } = this.state;
    //const { navigate } = this.props.navigation;
    return(
      <View style = {styles.container}>
        <Input onSubmit = {this.submitReview} />
        <ScrollView
          ref = {(scrollView) => { this._scrollView = scrollView; }}
          refreshControl = {
            <RefreshControl
              refreshing = {this.state.refreshing}
              onRefresh = {this.onRefresh}
            />
          }
        >
          {reviews.map((review, index)=> <Review review = {review} key = {index} />)}
        </ScrollView>

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
