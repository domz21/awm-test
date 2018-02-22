import React, { Component } from 'react';
import { View, Image, Text, TextInput, CheckBox, StyleSheet, TouchableOpacity, AsyncStorage } from 'react-native';
import { StackNavigator } from 'react-navigation';

export default class LoginForm extends Component{
  constructor (props){
    super(props);
    this.state = {
      username:'',
      password:''
    }
  }
  componentDidMount(){
    this._loadInitialState().done();
  }

  _loadInitialState = async()=> {
    var value = await AsyncStorage.getItem('user');
    if(value !== null){
      this.props.navigation.navigate('TopRated');
    }
  }

  render(){
    return(
      <View style = {styles.container}>

        <Text style = {styles.label}>USERNAME</Text>
        <TextInput
          style = {styles.input}
          placeholder = "Enter Username"
          onChangeText = { (username) => this.setState({username})}
          onSubmitEditing = { ()=> this.password.focus()}
         />
        <Text style = {styles.label}>PASSWORD</Text>
        <TextInput
          style = {styles.input}
          placeholder = "Enter Password"
          onChangeText = { (password)=> this.setState({password})}
          secureTextEntry = {true}
          ref = { (input) => this.password = input }
        />
        <TouchableOpacity style = {styles.buttonContainer}>
          <Text
            style = {styles.button}
            onPress = {this.login}
          >
            Log In
          </Text>
        </TouchableOpacity>

        <View style = {styles.keepLog}>
          <Text style = {styles.keep}>Keep Me Logged In</Text>
          <CheckBox style = {styles.check} />
          <TouchableOpacity>
            <Text style = {styles.keep}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  login = () => {
    alert(this.state.username);
    alert(this.state.password);
    fetch('http://192.168.43.11:3000/users', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password
      })
    })
    .then((response) => response.json())
    .then((res)=>{
      if(res.success === true){
        AsyncStorage.setItem('user', res.user);
        this.props.navigation.navigate('TopRated');
      }else{
        alert(res.message);
      }
    }).done();
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 20
  },
  input: {
    height: 40,
    marginBottom: 20,
    color: '#1b2657',
    paddingHorizontal: 10
  },
  label: {
    color: '#1b2657',
    fontWeight: 'bold'
  },
  buttonContainer: {
    height: 45,
    backgroundColor: '#1b2657',
    paddingVertical: 10,
    borderRadius: 50
  },
  button: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 18
  },
  keepLog: {
    alignItems: 'flex-end',
    paddingVertical: 15,
    flexDirection: 'row-reverse',
    borderBottomColor: '#1b2657',
    borderBottomWidth: 1,
    marginBottom: -15
  },
  socMedia: {
    paddingVertical: 15,
    flexDirection: 'row'
  },
  check: {
    marginLeft: 60,
    //checkedColor: '#1b2657'
  },
  keep: {
    marginBottom: 8,
    color: '#1b2657'
  },
  buttonGoogle: {
    height: 35,
    backgroundColor: '#bf1313',
    paddingVertical: 8,
    borderRadius: 50,
    width: 140,
    color: '#fff',
    marginRight: 40,
    textAlign: 'center'
  },
  buttonFb: {
    height: 35,
    backgroundColor: '#2d47a9',
    paddingVertical: 8,
    borderRadius: 50,
    width: 140,
    color: '#fff',
    textAlign: 'center'
  }
});
