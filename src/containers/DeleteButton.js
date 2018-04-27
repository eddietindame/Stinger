import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'
import { Button } from 'react-native-elements'
import { deleteAccount } from '../actions/authActions'
import { COLOURS } from '../modules/constants'

class DeleteButton extends Component {

    render() {
        return (
            <Button
                large
                rounded
                backgroundColor='#b50000'
                loading={ this.props.auth.isAuthenticating }
                icon={ this.props.auth.isAuthenticating ? null : {
                    name: 'exclamation-triangle',
                    type: 'font-awesome'
                }}
                title='Delete account'
                onPress={ this.props.deleteAccount }
            />
        )
    }
}

function mapStateToProps(state) {
    return { auth: state.authentication }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ deleteAccount: deleteAccount }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(DeleteButton)
