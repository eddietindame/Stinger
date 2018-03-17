import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import { COLOURS } from '../modules/constants'

const styles = StyleSheet.create({
    container: {
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
        flex: 1,
        fontSize: 24,
        fontFamily: 'CircularStd-Book',
        paddingVertical: 2,
        textAlign: 'center'
    },
    counter: {
        flexDirection: 'row'
    }
})

export default class Counter extends Component {
    constructor(props) {
        super(props)

        this.state = {
            count: 0
        }
    }

    increaseCount() {
        let count = this.state.count + 1
        count > 10 && (count = 10)
        this.setState({
            count: count
        })
    }

    decreaseCount() {
        let count = this.state.count - 1
        count < 0 && (count = 0)
        this.setState({
            count: count
        })
    }

  render() {
    return (
      <View style={ styles.container }>
        <Text style={ styles.label }>{ this.props.label }</Text>
        <View style={ styles.counter }>
            <TouchableOpacity
                style={{ justifyContent: 'center' }}
                onPress={ this.decreaseCount.bind(this) }
            >
                <Text style={{  }}>-</Text>
            </TouchableOpacity>

            <Text style={ styles.field }>
                { this.state.count }
            </Text>

            <TouchableOpacity
                style={{ justifyContent: 'center' }}
                onPress={ this.increaseCount.bind(this) }
            >
                <Text style={{  }}>+</Text>
            </TouchableOpacity>
        </View>
      </View>
    )
  }
}
