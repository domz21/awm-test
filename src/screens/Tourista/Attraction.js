import React, { Component } from 'react';
import { View, Text, Image, ImageBackground, ScrollView, TouchableOpacity, Animated, LayoutAnimation, PanResponder, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import { Card } from 'react-native-elements';
import PropTypes from 'prop-types';
import Dimensions from 'Dimensions';

const { width, height } = Dimensions.get('window');
const defaultHeight = height;

export default class Attraction extends Component {
  static propTypes = {
    isOpen: PropTypes.bool.isRequired,
    attraction: PropTypes.shape({
      name: PropTypes.string,
      rating: PropTypes.string,
      image: PropTypes.string,
      desc: PropTypes.string,
      address: PropTypes.string
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
        }else if(newHeight < defaultHeight * 1){
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
        //justifyContent: 'center',
      },
      title: this.state.expanded ? {
        textAlign: 'center',
      } : {},
    };
  }

  render (){
    const { attraction } = this.props;
    const { name, rating, open, close, address, desc, image } = attraction || {};
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
          <Image
            source = {{uri: image}}
            style = {styles.imageBackground}
          />
          <ScrollView>
            <View style = {[styles.descContainer, this.getStyles().descContainer]}>
              <Text style = {[styles.text, styles.title, this.getStyles().title]}>{name.toUpperCase()}</Text>
              <Card style = {styles.cardOne}>
                <View style = {{ alignItems: 'center' }}>
                  <Text>{address}</Text>
                  <Text>{rating}</Text>
                </View>
              </Card>
              <View style = {styles.desc}>
                <Card title="Description" style = {styles.card}>
                  <Text style = {{ width: 300, fontSize: 12 }}>{desc}</Text>
                </Card>
              
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
    backgroundColor: '#fff'
  },
  imageBackground: {
    flex: 1,
    //padding: 10
  },
  restoContainer: {
    flex: 2,
    //marginHorizontal: 60,
    padding: 20
  },
  text: {
    backgroundColor: 'transparent',
    color: '#000',
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
  card: {
    width: 100
  },
  desc: {
    backgroundColor: 'rgba(255,255,255,0.5)',
    borderRadius: 10,
    marginBottom: 80
  },
  descText: {
    color: '#333',
    fontSize: 15
  },
  buttonContainer: {
    marginTop: 20,
    margin: 15
  },
  button: {
    backgroundColor: '#617d8a',
    padding: 10
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center'
  }
});
