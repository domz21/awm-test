import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default class HeaderButton extends Component {
  static propTypes = {
    onPress: PropTypes.func.isRequired,
    icon: PropTypes.string.isRequired
  };
  static defaultProps = {
    icon: 'md-menu'
  };

  render(){
    return (
      <View style = {styles.container}>
        <Icon.Button
          name = {this.props.icon}
          size = {25}
          onPress = {this.props.onPress}
          style = {styles.burger}
        >
          <Text>Add New Restaurant</Text>
        </Icon.Button>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    top: 20,
    left: 7
  },
  burger: {
    backgroundColor: "#A470F7",
    color: "#fff",
    zIndex: 1
  }
});
