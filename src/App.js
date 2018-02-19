import React, { Component } from 'react';
import { View } from 'react-native';
import { createStore, applyMiddleware } from 'redux';
import { Provider, connect } from 'react-redux';
import { Actions, Router, Scene } from 'react-native-router-flux';
import logger from 'redux-logger';
import reducers from './reducers/index';
import LoginScene from './scenes/Login';
import MainScene from './scenes/Main';
import Dock from './containers/Dock';
// import Splash from './components/Splash';

const Scenes = Actions.create(
    <Scene key='root'>
      <Scene
          key='login'
          component={ LoginScene }
          title='Login'
          hideNavBar
          onEnter={ () => { if (this.checkAuth()) Actions.main(); } }
      />
      <Scene
          key='main'
          component={ MainScene }
          title='Main'
          hideNavBar
        //   initial={ this.props.children ? true : false }
      />
    </Scene>
);

const ConnectedRouter = connect()(Router);
const store = createStore(reducers, applyMiddleware(logger));

export default class App extends Component {

  render() {
    return (
      <Provider store={ store }>
        {/* <Splash /> */}
        <View style={{ flex: 1 }}>
            <ConnectedRouter scenes={ Scenes } />
            <Dock />
        </View>
      </Provider>
    );
  }
}
