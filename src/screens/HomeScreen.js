import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { View, Text, ImageBackground, Image, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import Dimensions from 'Dimensions';
//import HeaderButton from '../components/HeaderButton';

const screen = Dimensions.get('window');

export default class HomeScreen extends PureComponent {
  static propTypes = {
    restaurant: PropTypes.shape({
      name: PropTypes.string.isRequired,
      rating: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
    }).isRequired,
    onOpen: PropTypes.func.isRequired
  };

  render() {
    // const { navigate } = this.props.navigation;
    const { restaurant, restaurant: { name, rating, image }, onOpen } = this.props;
    //const { name, rating, image } = restaurant;
    return (
      <ScrollView style = {styles.container}>
        {/*<HeaderButton onPress = {() => navigate('DrawerOpen')} />
        <Text style = {styles.header}>Mga puds ditey</Text>*/}
        <TouchableOpacity
          style = {styles.row}
          onPress = {() => onOpen(restaurant)}
          activeOpacity = {0.7}
        >
          {/*Background Image*/}
          <ImageBackground
            source = {{uri: image}}
            style = {styles.imageBackground}
          >
            <Text style = {[styles.text, styles.title]}>{name}</Text>
            <View style = {styles.rating}>
              <Text style = {[styles.text, styles.value]}>{rating}</Text>
            </View>
          </ImageBackground>
        </TouchableOpacity>
      </ScrollView>
    );
  }

  _handlePress = () => {
    this.props.navigation.navigate('Restaurant');
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  header: {
    fontSize: 20,
    marginVertical: 20
  },
  row: {
    paddingBottom: 4
  },
  imageBackground: {
    height: screen.height / 3,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    color: '#fff',
    backgroundColor: 'transparent',
    fontWeight: 'bold',
    textShadowColor: '#222',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 4
  },
  title: {
    fontSize: 22
  },
  rating: {
    flexDirection: 'row'
  },
  value: {
    fontSize: 15
  }
});
