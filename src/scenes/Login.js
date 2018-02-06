import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import { Actions } from "react-native-router-flux";
import firebase from 'react-native-firebase';
import { AccessToken, LoginManager } from 'react-native-fbsdk';
import { Button } from 'react-native-elements';

export default class Login extends Component<{}> {

  constructor() {
    super();

    // this.login = this.login.bind(this);
    // this.logout = this.logout.bind(this);

    this.state = {
      user: null
    };
  }

  componentWidMount() {
    // Checks if user was previously signed in
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user });
      }
    });
  }

  login() {
    return LoginManager
      .logInWithReadPermissions(['public_profile', 'email'])
      .then(result => {
        if (!result.isCancelled) {
          console.log(`Login success with permissions: ${result.grantedPermissions.toString()}`)
          // get the access token
          return AccessToken.getCurrentAccessToken()
        }
      })
      .then(data => {
        if (data) {
          // create a new firebase credential with the token
          const credential = firebase.auth.FacebookAuthProvider.credential(data.accessToken)
          // login with credential
          return firebase.auth().signInWithCredential(credential)
        }
      })
      .then(currentUser => {
        if (currentUser) {
          // console.info(JSON.stringify(currentUser.toJSON()))
          this.setState({ user });
          console.info(currentUser);
        }
      })
      .catch(error => {
        console.log(`Login fail with error: ${error}`)
      })
  }

  logout() {
    firebase.auth().signOut()
      .then(() => {
        this.setState({ user: null });
      });
  }

  changeScene() {
    Actions.example();
  }

  render() {
    return (
      <View style={ styles.container }>
      { !this.state.user ?
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
