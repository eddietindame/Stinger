import React from 'react';
import { AppRegistry } from 'react-native';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import App from './src/App';
import reducers from './src/reducers/index';

const store = createStore(reducers, applyMiddleware(logger));

const Stinger = () => (
    <Provider store={ store }>
        <App/>
    </Provider>
);

AppRegistry.registerComponent('Stinger', () => Stinger);
