import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import firebase from 'react-native-firebase';
import { loginSuccess, logoutSuccess } from './actions/index';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import reducers from './reducers/index';
import Routes from './components/Routes';

class Splash extends Component {

  constructor(props) {
    super(props);

    // Checks if user was previously signed in
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.props.loginSuccess(user);
      }
    });

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

function mapStateToProps(state) {
  return {
    auth: state.authentication
  };
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({ loginSuccess:  loginSuccess,
                              logoutSuccess: logoutSuccess }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Splash);
