import React, { Component } from 'react'
import { Text, TextInput, View, StyleSheet } from 'react-native'
import { COLOURS } from '../modules/constants'

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        // justifyContent: 'flex-start',
        // alignItems: 'flex-start',
        // alignSelf: 'stretch',
        marginBottom: 20,
        borderBottomColor: COLOURS.BLACK,
        borderBottomWidth: StyleSheet.hairlineWidth
    },
    text: {
        fontSize: 24,
        fontFamily: 'CircularStd-Book'
    },
    label: {
        fontSize: 12,
        fontFamily: 'CircularStd-Book'
    },
    field: {
        fontSize: 24,
        fontFamily: 'CircularStd-Book',
        paddingVertical: 2
    }
})

export default class TextField extends Component {
  render() {
    return (
      <View style={ styles.container }>
        <Text style={ styles.label }>{ this.props.label }</Text>
        <TextInput
            style={ styles.field }
            value={ this.props.value }
            underlineColorAndroid='transparent'
        />
      </View>
    )
  }
}
