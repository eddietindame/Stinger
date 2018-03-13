import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Router, Scene, Actions, Reducer } from 'react-native-router-flux'
import Login from '../scenes/Login'
import Main from '../scenes/Main'
import Round from '../scenes/Round'
import Friends from '../scenes/Friends'

// const ConnectedRouter = connect()(Router)

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
        <Scene
            key='friends'
            component={ Friends }
            title='Friends'
        />
    </Scene>
)

class Routes extends Component {

    reducerCreate(params) {
        const defaultReducer = Reducer(params)

        return (state, action) => {
            this.props.dispatch(action)
            return defaultReducer(state, action)
        };
    }

    render() {
        return (
            <Router
                createReducer={ this.reducerCreate.bind(this) }
                scenes={ Scenes }
            />
        )
    }
}

export default connect()(Routes)
