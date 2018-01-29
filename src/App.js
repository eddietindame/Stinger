/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import firebase from 'react-native-firebase';

export default class App extends Component<{}> {

  constructor() {
    super();
    this.state = {
      isAuthenticated: false,
    };
  }

  componentDidMount() {
    // firebase.auth().signOut();
    firebase.auth().signInAnonymously()
      .then((user) => {
        this.setState({
          isAuthenticated: true,
        });
        console.log(user.isAnonymous);
      });
  }

  render() {
    // If the user has not authenticated
    if (!this.state.isAuthenticated) {
      return null;
    }

    return (
      <View style={ styles.container }>
        <Text>Welcome to my awesome app!</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
