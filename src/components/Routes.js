import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Router, Scene, Action } from 'react-native-router-flux';
import Login from '../scenes/Login';
import Example from '../scenes/Example';
import { loginSuccess, logoutSuccess } from '../actions/index';

class Routes extends Component {

  render() {
    return (
        <Router>
          <Scene key='root'>
            <Scene
                key='login'
                component={ Login }
                title='Login'
                hideNavBar
                onEnter={ () => { console.log('onEnter: ', this.props.auth.user); if (this.props.auth.user) Action.example(); } }
            />
            <Scene
                key='example'
                component={ Example }
                title='Example'
                initial={ this.props.auth.user ? true : false }
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
