import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Router, Scene, Actions } from 'react-native-router-flux'
import Login from '../scenes/Login'
import Main from '../scenes/Main'
import Round from '../scenes/Round'

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
        <Scene
            key='round'
            component={ Round }
            title='Round'
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

export default connect(mapStateToProps, null)(Routes)
