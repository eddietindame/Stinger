import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import reducers from './reducers/index';
import Routes from './components/Routes';

export default class App extends Component {

  constructor(props) {
    super(props);

    this.store = createStore(reducers, applyMiddleware(logger));
  }

  render() {
    return (
      <Provider store={ this.store }>
        <Routes />
      </Provider>
    );
  }
}
