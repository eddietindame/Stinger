import React, { Component } from 'react';
import {
  StyleSheet,
  View
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import firebase from 'react-native-firebase';
import { AccessToken, LoginManager } from 'react-native-fbsdk';
import { Button } from 'react-native-elements';
import { loginSuccess, logoutSuccess } from '../actions/index';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FDC132'
  },
  button: {
    width: 100,
    height: 50,
    marginTop: 50,
    backgroundColor: '#314f89'
  },
  padding: { marginTop: 50 }
});

class Login extends Component {

  constructor() {
    super();

    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }

  componentWillMount() {
    // Checks if user was previously signed in
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.props.loginSuccess(user);
      }
    });
  }

  login() {
    return LoginManager
      .logInWithReadPermissions(['public_profile', 'email'])
      .then(result => {
        if (!result.isCancelled) {
          console.log(`Login success with permissions: ${result.grantedPermissions.toString()}`);
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
      .then(currentUser => {
        if (currentUser) {
          // console.info(JSON.stringify(currentUser.toJSON()))
          this.props.loginSuccess(currentUser);
          console.log('login, ', this.props.auth);
          // Actions.example();
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
        console.log('logout, ', this.props.auth);
      });
  }

  changeScene() {
    Actions.example();
  }

  render() {
    return (
      <View style={ styles.container }>
      { !this.props.auth.user ?
        <Button
          large
          rounded
          backgroundColor='#4252B2'
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
        <Button
            large
            rounded
            backgroundColor='#ff0055'
            title='Switch scene'
            onPress={ this.changeScene }
            buttonStyle={ styles.padding } />
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
  return bindActionCreators({ loginSuccess: loginSuccess,
                              logoutSuccess: logoutSuccess }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Login);
