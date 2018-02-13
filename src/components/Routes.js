import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Router, Scene, Action } from 'react-native-router-flux';
import Login from '../scenes/Login';
import Main from '../scenes/Main';
import { loginSuccess, logoutSuccess } from '../actions/index';

class Routes extends Component {

  checkAuth() {
    console.log('onEnter: ', this.props.children);
    return this.props.children ? true : false;
  }

  render() {
    return (
        <Router>
          <Scene key='root'>
            <Scene
                key='login'
                component={ Login }
                title='Login'
                hideNavBar
                onEnter={ () => { if (this.checkAuth()) Action.main(); } }
            />
            <Scene
                key='main'
                component={ Main }
                title='Main'
                hideNavBar
                initial={ this.props.children ? true : false }
            />
          </Scene>
        </Router>
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

export default connect(mapStateToProps, matchDispatchToProps)(Routes);
