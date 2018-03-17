import React, { Component } from 'react'
import {
    StyleSheet,
    Text,
    View,
    Dimensions } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { COLOURS, GRADIENTS } from '../modules/constants'
import LoginButton from '../containers/LoginButton'

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        justifyContent: 'flex-end',
        // flex: 1,
        // top: 0,
        bottom: 0,
        left: 0,
        right: 0
    }
})

export default class Options extends Component {

    constructor(props) {
        super(props)

        this.state = {
            open: false
        }

        let { height, width } = Dimensions.get('window')
        this.height = height
    }

  render() {
    return (
      <LinearGradient
        // colors={ GRADIENTS.FACEBOOK_BLUE }
        colors={[ 'transparent', COLOURS.BLACK ]}
        style={[
            styles.container,
            {
                height: this.height,
                bottom: this.props.open ? 0 : -1000
            }
        ]}
      >
        <View  style={{ marginBottom: 20 }}>
            <LoginButton />
        </View>
        <View  style={{ marginBottom: 20 }}>
            <LoginButton />
        </View>
      </LinearGradient>
    )
  }
}
