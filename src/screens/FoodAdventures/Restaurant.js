import React, { Component } from 'react';
import { View, Text, Image, ImageBackground, ScrollView, TouchableOpacity, Animated, LayoutAnimation, PanResponder, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import Dimensions from 'Dimensions';

const { width, height } = Dimensions.get('window');
const defaultHeight = height * 0.8;

export default class Restaurant extends Component {
  static propTypes = {
    isOpen: PropTypes.bool.isRequired,
    restaurant: PropTypes.shape({
      name: PropTypes.string,
      rating: PropTypes.string,
      image: PropTypes.string,
      desc: PropTypes.string
    }),
    onClose: PropTypes.func
  }

  state = {
    position: new Animated.Value(this.props.isOpen ? 0 : height),
    opacity: new Animated.Value(0),
    height: defaultHeight,
    expanded: false,
    visible: this.props.isOpen
  };

  _previousHeight = 0

  componentWillMount(){
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        const { dx, dy } = gestureState;
        if(dx !== 0 && dy === 0){
          return true;
        }
        return false;
      },
      onPanResponderGrant: (evt, gestureState) => {
        this._previousHeight = this.state.height;
      },
      onPanResponderMove: (evt, gestureState) => {
        const {dx, vy} = gestureState;
        let newHeight = this._previousHeight - dy;
        LayoutAnimation.easeInEaseOut();

        if(vy < -0.75){
          this.setState({
            expanded: true,
            height: height
          });
        }else if(vy > 0.75){
          this.props.onClose();
        }else if(newHeight < defaultHeight * 0.9){
          this.props.onClose();
        }else if(newHeight > height){
          this.setState({ height: height });
        }else {
          this.setState({ height: newHeight });
        }
      },
      onPanResponderTerminationRequest: (evt, gestureState) => true,
      onPanResponderRelease: (evt, gestureState) => {
        const { dy } = gestureState;
        const newHeight = this._previousHeight - dy;
        if(newHeight < defaultHeight){
          this.props.onClose();
        }
        this._previousHeight = this.state.height;
      },
      onShouldBlockNativeResponder: (evt, gestureState) => {
        return true;
      }
    });
  }

  //isOpen open or close popup
  componentWillReceiveProps(nextProps){
    if(!this.props.isOpen && nextProps.isOpen){
      this.animateOpen();
    }else if(this.props.isOpen && !nextProps.isOpen){
      this.animateClose();
    }
  }

  //open popup
  animateOpen(){
    this.setState({ visible: true }, () => {
      Animated.parallel([
        Animated.timing(
          this.state.position, { toValue: 0.5 }
        ),
        Animated.timing(
          this.state.position, { toValue: 0 }
        )
      ]).start();
    });
  }

  //close popup
  animateClose(){
    Animated.parallel([
      Animated.timing(
        this.state.opacity, { toValue: 0 }
      ),
      Animated.timing(
        this.state.position, { toValue: height }
      ),
    ]).start(() => this.setState({
      visible: false,
      expanded: false
    }));
  }

  // Dynamic styles that depend on state
  getStyles = () => {
    return {
      restoContainer: this.state.expanded ? {
        flexDirection: 'column',
        alignItems: 'center',
      } : {
        flexDirection: 'row',
      },
      descContainer: this.state.expanded ? {
        flex: 0,
        alignItems: 'center',
        paddingTop: 10,
      } : {
        flex: 1,
        justifyContent: 'center',
      },
      title: this.state.expanded ? {
        textAlign: 'center',
      } : {},
    };
  }

  render (){
    const { restaurant } = this.props;
    const { name, rating, desc, image } = restaurant || {};
    if(!this.state.visible){
      return null;
    }
  //  const { navigate } = this.props.navigation;
    //const { name, rating, desc, image } = restaurant;
    return (
      <View style = {styles.container}>
        <TouchableWithoutFeedback onPress = {this.props.onClose}>
          <Animated.View style = {[styles.backdrop, { opacity: this.state.opacity }]}/>
        </TouchableWithoutFeedback>
        <Animated.View
          style = {[styles.modal, {
            height: this.state.height,
            transform: [{ translateY: this.state.position }, { translateX: 0 }]
          }]}
        >
          <ImageBackground
            source = {{uri: image}}
            style = {styles.imageBackground}
          >
            <ScrollView style = {[styles.restoContainer, this.getStyles().restoContainer]} {...this._panResponder.panHandlers}>
              <View style = {[styles.descContainer, this.getStyles().descContainer]}>
                <Text style = {[styles.text, styles.title, this.getStyles().title]}>{name.toUpperCase()}</Text>
                <View style = {styles.rating}>
                  <Text style = {[styles.text, styles.value]}>{rating}</Text>
                </View>
                <View style = {styles.desc}>
                  <Text style = {styles.descText}>{desc}</Text>
                </View>
              </View>
            </ScrollView>

            <View style = {styles.buttonContainer}>
              <TouchableOpacity
                onPress = {this.props.onClose}
                activeOpacity = {0.7}
                style = {styles.button}
              >
                <Text style = {styles.buttonText}>CLOSE</Text>
              </TouchableOpacity>
            </View>
          </ImageBackground>
        </Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    backgroundColor: 'transparent'
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'black',
  },
  modal: {
    backgroundColor: '#333'
  },
  imageBackground: {
    flex: 1,
    padding: 20
  },
  restoContainer: {
    flex: 1,
    marginHorizontal: 60
  },
  text: {
    backgroundColor: 'transparent',
    color: '#fff',
    fontWeight: 'bold',
    textShadowColor: '#222',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 4
  },
  title: {
    fontSize: 22,
    textAlign: 'center'
  },
  rating: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  value: {
    fontSize: 16
  },
  desc: {
    backgroundColor: 'rgba(255,255,255,0.5)',
    borderRadius: 10,
    marginTop: 40,
    padding: 10
  },
  descText: {
    color: '#333',
    fontSize: 15
  },
  buttonContainer: {
    marginTop: 20
  },
  button: {
    backgroundColor: '#617d8a',
    padding: 15
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center'
  }
});
