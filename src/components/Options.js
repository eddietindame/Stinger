import React, { Component } from 'react'
import {
    StyleSheet,
    Text,
    View,
    Dimensions } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { COLOURS, GRADIENTS } from '../modules/constants'
import LoginButton from '../containers/LoginButton'
import DeleteButton from '../containers/DeleteButton'

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        justifyContent: 'flex-end',
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
            <DeleteButton />
        </View>
      </LinearGradient>
    )
  }
}
