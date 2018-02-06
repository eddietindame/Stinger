import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import { Router, Scene } from "react-native-router-flux";
import Login from "./scenes/Login";
import Example from "./scenes/Example";

export default class App extends Component<{}> {

  render() {
    return (
      <Router>
        <Scene key='root'>
          <Scene
            key='login'
            component={ Login }
            title='Login'
            hideNavBar
            initial />
          <Scene
            key='example'
            component={ Example }
            title='Example' />
        </Scene>
      </Router>
    );
  }
}
