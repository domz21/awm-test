import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default class Drawer extends Component {
  constructor(props){
    super(props)

    this.state = {
      userInfo: this.props.navigation.state.params.userInfo,
    };
  }

  render(){
    const { navigate } = this.props.navigation;
    //const { userInfo } = this.props.navigation.navigate.state.params.userInfo;
    return(
      <View style = {styles.container}>
        <View style = {styles.head}>
          {/*<Icon name = "ios-contact-outline" size = {100} color="rgba(0,0,0,.09)" />*/}
          <Image
            source = {{ uri: this.state.userInfo.picture.data.url }}
            style = {styles.avatarImage}
          />
          <Text style = {styles.header}>{this.state.userInfo.name}</Text>
        </View>
        <TouchableOpacity
          onPress = {() => navigate('Home')}
          style = {styles.button}
        >
          <Text style = {styles.font}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style = {styles.button}
          onPress = {() => navigate('About')}
        >
          <Text style = {styles.font}>About Malolos</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style = {styles.button}
          onPress = {() => navigate('AttractionsTab')}
        >
          <Text style = {styles.font}>Historical Spots</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style = {styles.button}
          onPress = {() => navigate('Map')}
        >
          <Text style = {styles.font}>Map View</Text>
        </TouchableOpacity>
        {/*<TouchableOpacity
          style = {styles.button}
          onPress = {() => navigate('Drawer Close')}
        >
          <Text style = {styles.font}>My Bookmarks</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style = {styles.button}
          onPress = {() => navigate('Drawer Close')}
        >
          <Text style = {styles.font}>My Establishments</Text>
        </TouchableOpacity>*/}
        <TouchableOpacity
          style = {styles.button}
          onPress = {() => navigate('New')}
        >
          <Text style = {styles.font}>Add a New Restaurant</Text>
        </TouchableOpacity>
        {/*<TouchableOpacity
          style = {styles.button}
          onPress = {() => navigate('Drawer Close')}
        >
          <Text style = {styles.font}>Contact Us</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style = {styles.button}
          onPress = {() => navigate('Drawer Close')}
        >
          <Text style = {styles.font}>Settings</Text>
        </TouchableOpacity>*/}
        <TouchableOpacity
          style = {styles.button}
          onPress = {() => navigate('Login')}
        >
          <Text style = {styles.font}>Log Out</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F5FA',
    //alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15
  },
  head: {
    backgroundColor: '#A470F7',
    padding: 20,
    margin: -20
  },
  avatarImage: {
    marginTop: 20,
    marginBottom: 10,
    borderRadius: 50,
    height: 100,
    width: 100,
  },
  header: {
    fontSize: 20,
    //marginVertical: 20,
    fontWeight: 'bold',
    //fontFamily: 'Roboto',
    color: '#fff'
  },

});
