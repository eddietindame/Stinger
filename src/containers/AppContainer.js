import { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import firebase from 'react-native-firebase';
import { AccessToken } from 'react-native-fbsdk';
import { Actions } from 'react-native-router-flux';
import SplashScreen from 'react-native-splash-screen';
import { loginSuccess, logoutSuccess } from '../actions/index';

class AppContainer extends Component {

  constructor(props) {
    super(props);

    this.isLoggedIn();
  }

  isLoggedIn() {
    AccessToken.getCurrentAccessToken()
      .then(token => {
        if (token) {
          firebase.auth().onAuthStateChanged(user => {
            if (user) {
              this.props.loginSuccess(user);
              Actions.main('reset');
            }
          });
        }
        setTimeout(() => {
          try {
            SplashScreen.hide();
          } catch (error) {
            console.info(error);
          }
        }, 500);
      });
  }

  render() {
    return (
      this.props.children 
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

export default connect(mapStateToProps, matchDispatchToProps)(AppContainer);
