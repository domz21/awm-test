import React, { Component } from 'react';
import { View, Text, ImageBackground, ScrollView, StyleSheet } from 'react-native';
import { Card } from 'react-native-elements';

export default class About extends Component {
  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <ImageBackground
            style = {styles.backgroundContainer}
            source = {require('../img/splash.jpg')}
          >
            <Text style={styles.paragraphs}>
              ABOUT US
            </Text>
            <Card title="About Aye! Wander Malolos">
              <Text style={styles.paragraph}>
                Aye! Wander Malolos is a travel application created by students of Centro Escolar University in order to help tourism of Malolos Bulacan.
                It focuses mostly on places found only in Malolos, whether they be, restaurants, bakeries & cafes, bars & clubs, food parks, establishments, and the different famous tourist spots.
                The Aye! Wander Malolos gives customers every details they would want to know. From images up to locations.
              </Text>
            </Card>
            <Card title="About Malolos">
              <Text style={styles.paragraph}>
                MALOLOS is located north of Manila, it is the second capital of the province of Bulacan after it was transferred from the town of Bulakan in 1901.  It is composed
                of 51 barangays, 5 of which are situated at the coast of the Bay of Manila.
              </Text>
            </Card>
            <Card title="About DTI">
              <Text style={styles.paragraph}>
                The Philippine Department of Trade and Industry is the executive department of the Philippine Government tasked as the main economic catalyst that enables innovative, competitive, job generating, inclusive business, and empowers consumers.
              </Text>
            </Card>
            <Card title="About DOT">
              <Text style={styles.paragraph}>
                The Department of Tourism is the executive department of the Philippine government responsible for the regulation of the Philippine tourism industry and the promotion of the Philippines as a tourist destination.
              </Text>
            </Card>
          </ImageBackground>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    alignItems: 'center',
    justifyContent: 'center',
    //paddingTop: 50,
    //paddingBottom: 50,
    marginBottom: 0,
    //backgroundColor: '#ecf0f1',
  },
  backgroundContainer: {
    //position: 'absolute',
    //flexGrow: 1
    paddingBottom: 50,
    paddingTop: 50
  },
  paragraphs: {
    margin: 2,
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#fff',
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#34495e',
  }
});
