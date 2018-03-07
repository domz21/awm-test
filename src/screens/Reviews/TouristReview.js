import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { View, Image, Text, KeyboardAvoidingView, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import moment from 'moment';

export default class TouristReview extends PureComponent {
  static propTypes = {
    //review object shape
    tour: PropTypes.shape({
      content: PropTypes.string.isRequired,
      created: PropTypes.string.isRequired,
      //user object shape
      // user: PropTypes.shape({
      //   name: PropTypes.string.isRequired,
      //   avatar: PropTypes.string.isRequired
      // }).isRequired,
    }).isRequired,
  };

  render(){
    //review Object
    const { tour } = this.props;
    //data displayed in review
    const { content, created } = tour;
    //username and avatar
    //const { name, avatar } = user;
    return(
      <View style = {styles.container}>
        {/*<View style = {styles.avatarContainer}>
          {avatar && <Image
            resizeMode = 'contain'
            style = {styles.avatar}
            source = {{ uri: avatar }}
          />}
        </View>*/}
        <View style = {styles.contentContainer}>
          {/*<Text>
            <Text style = {[styles.text, styles.name]}>{name}</Text>
            {' '}*/}
            <Text style = {styles.text}>{content}</Text>

          <Text style = {[styles.text, styles.created]}>{moment(created).fromNow()}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row'
  },
  avatarContainer: {
    alignItems: 'center',
    marginLeft: 5,
    paddingTop: 10,
    width: 40
  },
  contentContainer: {
    flex: 1,
    borderBottomWidth: 1,
    borderColor: '#EEE',
    padding: 5,
  },
  avatar: {
    borderWidth: 1,
    borderColor: '#EEE',
    borderRadius: 13,
    width: 26,
    height: 26,
  },
  text: {
    color: '#000',
    //fontFamily: 'Avenir',
    fontSize: 15,
  },
  name: {
    fontWeight: 'bold',
  },
  created: {
    color: '#BBB',
  }
});
