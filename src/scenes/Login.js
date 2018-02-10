import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Image,
  Animated
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
    justifyContent: 'space-around',
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

    this.state = {
      slide: new Animated.ValueXY({ x: 0, y: -2000 })
    };

    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);

    this.slideIn = Animated.spring(
      this.state.slide,
      {
        toValue: 2
      }
    );
  }

  componentWillMount() {
    // Checks if user was previously signed in
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // this.props.loginSuccess(user);
      }
    });
  }

  componentDidMount() {
    this.slideIn.start();
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
      .then(currentUser => {
        if (currentUser) {
          // console.info(JSON.stringify(currentUser.toJSON()))
          this.props.loginSuccess(currentUser);
          Actions.example({ type: 'reset' });
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
  }

  changeScene() {
    Actions.example();
  }

  render() {
    const slideStyle = { transform: [
      { translateX: this.state.slide.x },
      { translateY: this.state.slide.y }
    ] };

    return (
      <View style={ styles.container }>
        <Image
          source={ require('../img/StingerLogo.png') }
        />
        <Animated.View style={ slideStyle }>
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
        </Animated.View>
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

export default connect(mapStateToProps, matchDispatchToProps)(Login);
