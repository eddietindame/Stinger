import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import { Actions } from "react-native-router-flux";
import { Button } from 'react-native-elements';

export default class Example extends Component<{}> {

  render() {
    return (
      <View style={ styles.container }>
        <Text>Example Scene</Text>
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
