import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Router, Scene, Actions } from 'react-native-router-flux'
import Login from '../scenes/Login'
import Main from '../scenes/Main'
import { loginSuccess, logoutSuccess } from '../actions/authActions'

const ConnectedRouter = connect()(Router)

const Scenes = Actions.create(
  <Scene key='root'>
    <Scene
        key='login'
        component={ Login }
        title='Login'
        hideNavBar
    />
    <Scene
        key='main'
        component={ Main }
        title='Main'
        hideNavBar
    />
  </Scene>
)

class Routes extends Component {

  render() {
    return (
      <ConnectedRouter scenes={ Scenes } />
    )
  }
}

function mapStateToProps(state) {
  return {
    auth: state.authentication
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ loginSuccess:  loginSuccess,
                              logoutSuccess: logoutSuccess }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Routes)
