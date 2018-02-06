import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import firebase from 'react-native-firebase';
import { Button } from 'react-native-elements';
import facebookLogin from './modules/FacebookLogin';
import configureStore from './configureStore';

export default class App extends Component<{}> {

  constructor() {
    super();
    this.state = {
      isAuthenticated: false,
    };
  }

  render() {
    return (
      <View style={ styles.container }>
        <Button
          large
          rounded
          backgroundColor='#4252B2'
          icon={{ name: 'facebook-f',
                  type: 'font-awesome' }}
          title='Log in with Facebook'
          onPress={ facebookLogin } />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FDC132'
  }
});
