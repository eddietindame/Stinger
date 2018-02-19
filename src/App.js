import React, { Component } from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import logger from 'redux-logger';
import reducers from './reducers/index';
import Routes from './containers/Routes';
import Dock from './containers/Dock';
import AppContainer from './containers/AppContainer';

const store = createStore(reducers, applyMiddleware(logger));

export default class App extends Component {

  render() {
    return (
      <Provider store={ store }>
        <AppContainer>
          <Routes />
          <Dock />
        </AppContainer>
      </Provider>
    );
  }
}
