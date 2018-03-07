import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Image, Text, TextInput, KeyboardAvoidingView, ScrollView, TouchableOpacity, Picker, StyleSheet } from 'react-native';
import { StackNavigator } from 'react-navigation';
import HeaderButton from '../../components/HeaderButton';

export default class New extends Component {
  static propTypes = {
    onSubmit: PropTypes.func
  };
  state = {
    name: undefined, //user input
    open: undefined,
    close: undefined,
    closed: undefined,
    address: undefined,
    contact: undefined,
    type: undefined,
    desc: undefined
  };
  onChangeText = (name, open, close, closed, address, contact, type, desc) => this.setState({ name, open, close, closed, address, contact, type, desc }); //update state when input changes
  onSubmitEditing = ({ nativeEvent: { name, open, close, closed, address, contact, type, desc } }) => this.setState({ name, open, close, closed, address, contact, type, desc}, this.submit);

  //pass a restaurant
  submit = () => {
    const { name, open, close, closed, address, contact, type, desc } = this.state;
    if(name, open, close, closed, address, contact, type, desc){
      this.setState({ name: undefined }, () => this.props.onSubmit(name, open, close, closed, address, contact, type, desc));
      alert('Request pending');
    }else{
      alert('Please fill required spaces before submitting');
    }
  };

  render(){
    const { navigate } = this.props.navigation;
    return(
      <ScrollView>
        <KeyboardAvoidingView behavior='padding'>
          <View style = {styles.container}>
            <View style = {styles.head}>
              <Text style = {styles.header}>Add A New Restaurant</Text>
            </View>
            <View style = {styles.inputs}>
              <Text style = {styles.label}>Restaurant Name</Text>
              <TextInput
                style = {styles.input}
                underlineColorAndroid = "transparent"
                placeholder = "e.g. Kalye Mabini"
                value = {this.state.name}
               />
              <Text style = {styles.label}>Opening Hours</Text>
              <View style = {{ flexDirection: 'row' }}>
                <TextInput
                 style = {styles.hours}
                 underlineColorAndroid = "transparent"
                 placeholder = "Open"
                 keyboardType = "numeric"
                 value = {this.state.open}
                />
                <TextInput
                  style = {styles.hours}
                  underlineColorAndroid = "transparent"
                  placeholder = "Close"
                  keyboardType = "numeric"
                  value = {this.state.close}
                />
              </View>
              <Text style = {styles.label}>Closed Every</Text>
              <TextInput
                style = {styles.input}
                underlineColorAndroid = "transparent"
                placeholder = "e.g. Saturday"
                value = {this.state.closed}
              />
              <Text style = {styles.label}>Address</Text>
              {/*<Picker
                selectedValue={this.state.language}
                onValueChange={(itemValue, itemIndex) => this.setState({language: itemValue})}>
                <Picker.Item label = "SELECT LOCATION" />
                <Picker.Item label="Java" value="java" />
                <Picker.Item label="JavaScript" value="js" />
              </Picker>*/}
              <TextInput
                style = {styles.input}
                underlineColorAndroid = "transparent"
                placeholder = "e.g. Bulihan, Malolos, Bulacan"
                value = {this.state.address}
              />
              <Text style = {styles.label}>Contact Number</Text>
              <TextInput
                style = {styles.input}
                underlineColorAndroid = "transparent"
                placeholder = "Restaurant dial number"
                keyboardType = "numeric"
                value = {this.state.contact}
              />
              <Text style = {styles.label}>Type of Restaurant</Text>
              <Picker
                selectedValue={this.state.type}
                onValueChange={(itemValue, itemIndex) => this.setState({type: itemValue})}>
                <Picker.Item label = "Select Restaurant Type" />
                <Picker.Item label="Bar" value="Bar" />
                <Picker.Item label="Buffet" value="Buffet" />
                <Picker.Item label="Cafe" value="Cafe" />
                <Picker.Item label="Casual Dining" value="Casual Dining" />
                <Picker.Item label="Family Style" value="Family Style" />
                <Picker.Item label="Fastfood" value="Fastfood" />
              </Picker>
              <Text style = {styles.label}>Add a Description</Text>
              <TextInput
                style={styles.descBox}
                underlineColorAndroid = "transparent"
                placeholder = "Add a description..."
                value = {this.state.desc}
              />
              <TouchableOpacity style = {styles.buttonContainer} onSubmitEditing = {this.onSubmitEditing}>
                <Text style = {styles.button}>Add New Restaurant</Text>
              </TouchableOpacity>
            </View>


          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 30,
    backgroundColor: '#fff'
    //paddingHorizontal: 20,
  },
  head: {
    backgroundColor: '#A470F7',
    paddingHorizontal: -30,
    marginTop: -30
  },
  header: {
    fontSize: 17,
    marginVertical: 20,
    paddingTop: 20,
    paddingHorizontal: 20,
    fontWeight: 'bold',
    //fontFamily: 'Roboto',
    color: '#fff'
  },
  inputs: {
    paddingHorizontal: 20,
    paddingTop: 10
  },
  input: {
    height: 40,
    marginBottom: 10,
    backgroundColor: '#ffff',
    paddingHorizontal: 10,
    borderStyle: 'solid',
    borderWidth: 2.5
  },
  hours: {
    height: 40,
    width: 100,
    marginBottom: 10,
    backgroundColor: '#F9F3F6',
    paddingHorizontal: 10,
    borderStyle: 'solid',
    borderWidth: 2.5,
    marginRight: 20
  },
  label: {
    color: '#210F3E',
    fontWeight: 'bold'
  },
  descBox: {
    height: 100,
    marginBottom: 10,
    backgroundColor: '#F9F3F6',
    paddingHorizontal: 10,
    borderStyle: 'solid',
    borderWidth: 2.5
  },
  buttonContainer: {
    height: 40,
    backgroundColor: '#A470F7',
    paddingVertical: 10,
    borderRadius: 10
  },
  button: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16
  }
});
