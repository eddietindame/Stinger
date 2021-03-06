import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'
import { Button } from 'react-native-elements'
import { login, logout } from '../actions/authActions'
import { COLOURS } from '../modules/constants'

class LoginButton extends Component {

    changeScene() {
        this.props.auth.user
            ? Actions.main({ type: 'reset' })
            : Actions.login({ type: 'reset' })
    }

    render() {
        return (
            !this.props.auth.user
            ? <Button
                large
                rounded
                backgroundColor={ COLOURS.FACEBOOK_BLUE }
                loading={ this.props.auth.isAuthenticating }
                icon={ this.props.auth.isAuthenticating ? null : {
                    name: 'facebook-f',
                    type: 'font-awesome'
                }}
                title='Log in with Facebook'
                onPress={ this.props.login }
            />
            : <Button
                large
                rounded
                backgroundColor='#ff0000'
                loading={ this.props.auth.isAuthenticating }
                icon={ this.props.auth.isAuthenticating ? null : {
                    name: 'facebook-f',
                    type: 'font-awesome'
                }}
                title='Log out'
                onPress={ this.props.logout }
            />
        )
    }
}

function mapStateToProps(state) {
    return {
        auth: state.authentication
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ login:  login,
                                logout: logout }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginButton)
