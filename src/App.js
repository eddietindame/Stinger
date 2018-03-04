import React, { Component } from 'react'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk'
import reducers from './reducers/index'
import Routes from './containers/Routes'
import Dock from './containers/Dock'
import AppContainer from './containers/AppContainer'

export const store = createStore(reducers, applyMiddleware(thunk, createLogger({
  collapsed: true
})))

export default class App extends Component {

  render() {
    return (
      <Provider store={ store }>
        <AppContainer>
          <Routes />
          <Dock />
        </AppContainer>
      </Provider>
    )
  }
}
