import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  AsyncStorage
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import firebase from 'react-native-firebase';
import { AccessToken, LoginManager } from 'react-native-fbsdk';
import { Button } from 'react-native-elements';
import { loginSuccess, logoutSuccess } from '../actions/index';
import { COLOURS } from '../modules/constants';

const styles = StyleSheet.create({
  button: {
    width: 100,
    height: 50,
    marginTop: 50,
    // backgroundColor: '#314f89'
    backgroundColor: COLOURS.BLUE
  }
});

class LoginButton extends Component {

  constructor() {
    super();

    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }

  componentWillMount() {
    // Checks if user was previously signed in
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // this.props.loginSuccess(user);
      }
    });
  }

  login() {
    return LoginManager
      .logInWithReadPermissions(['public_profile', 'email'])
      .then(result => {
        if (!result.isCancelled) {
          // console.log(`Login success with permissions: ${result.grantedPermissions.toString()}`);
          // get the access token
          return AccessToken.getCurrentAccessToken();
        }
      })
      .then(data => {
        if (data) {
          // create a new firebase credential with the token
          const credential = firebase.auth.FacebookAuthProvider.credential(data.accessToken);
          // login with credential
          return firebase.auth().signInWithCredential(credential);
        }
      })
      .then(async currentUser => {
        if (currentUser) {
          console.info(JSON.stringify(currentUser.toJSON()));
          this.props.loginSuccess(currentUser);

          // try {
          //   await AsyncStorage.setItem('@AppStore:user', JSON.stringify(currentUser));
          //   console.log('await1');
          // } catch (error) {
          //   throw new Error(error);
          // }

          // this.changeScene();
          Actions.main({ type: 'reset' });
        }
      })
      .catch(error => {
        console.log(`Login fail with error: ${error}`);
      });
  }

  logout() {
    firebase.auth().signOut()
      .then(() => {
        this.props.logoutSuccess();
      });
    LoginManager.logOut();
    AsyncStorage.removeItem('@AppStore:user');
  }

  changeScene() {
    if (this.props.auth.user)
      Actions.main({ type: 'reset' });
    else
      Actions.login({ type: 'reset' });
  }

  render() {

    return (
      <View>
        { !this.props.auth.user ?
          <Button
            large
            rounded
            backgroundColor={ COLOURS.FACEBOOK_BLUE }
            icon={{ name: 'facebook-f',
                    type: 'font-awesome' }}
            title='Log in with Facebook'
            onPress={ this.login } />
          :
          <Button
            large
            rounded
            backgroundColor='#ff0000'
            icon={{ name: 'facebook-f',
                    type: 'font-awesome' }}
            title='Log out'
            onPress={ this.logout } />
        }
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

export default connect(mapStateToProps, matchDispatchToProps)(LoginButton);
