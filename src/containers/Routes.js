import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Router, Scene, Tabs, Actions } from 'react-native-router-flux';
import Login from '../scenes/Login';
import Main from '../scenes/Main';
import { loginSuccess, logoutSuccess } from '../actions/index';

const ConnectedRouter = connect()(Router);

const Scenes = Actions.create(
  <Scene key='root'>
    <Scene
        key='login'
        component={ Login }
        title='Login'
        hideNavBar
        // onEnter={ () => { if (this.checkAuth()) Actions.main(); } }
    />
    <Scene
        key='main'
        component={ Main }
        title='Main'
        hideNavBar
        // initial={ this.props.auth.user ? true : false }
    />
  </Scene>
);

class Routes extends Component {

  checkAuth() {
    // return this.props.children ? true : false;
  }

  render() {
    return (
      <ConnectedRouter scenes={ Scenes } />
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
