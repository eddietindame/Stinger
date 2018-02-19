import React, { Component } from 'react';
import { AsyncStorage, View } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import firebase from 'react-native-firebase';
import { AccessToken } from 'react-native-fbsdk';
import { Actions } from 'react-native-router-flux';
import { loginSuccess, logoutSuccess } from '../actions/index';
import Routes from './/Routes';
import Dock from './Dock';

class Splash extends Component {

  constructor(props) {
    super(props);

    this.isLoggedIn();
  }

  // async isLoggedIn() {
  //   try {
  //       const user = await JSON.parse(AsyncStorage.getItem('@AppStore:user'));
  //       if (user){
  //         // We have data!!
  //         console.log('async:', user);
  //           this.props.loginSuccess(user);
  //       }
  //     } catch (error) {
  //       throw new Error(error);
  //     }
  // }

  // async isLoggedIn() {
  //   // Checks if user was previously signed in
  //   return await firebase.auth().onAuthStateChanged((user) => {
  //     if (user) {
  //       this.props.loginSuccess(user);
  //     }
  //   });
  // }

  isLoggedIn() {
    AccessToken.getCurrentAccessToken()
      .then(token => {
        if (token) {
          firebase.auth().onAuthStateChanged(user => {
            if (user) {
              this.props.loginSuccess(user);
              Actions.main();
            }
          });
        }
      });
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Routes>
            { this.props.auth.user }
            {/* { 'poop' } */}
        </Routes>
        <Dock />
      </View>
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
