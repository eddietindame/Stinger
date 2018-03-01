import React, { Component } from 'react'
import {
    StyleSheet,
    Text,
    View,
    Image
} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import {
    GRADIENTS,
    ICONS,
    COLOURS
} from '../modules/constants'

const styles = StyleSheet.create({
    container: {
        height: 100,
        marginBottom: 8,
        padding: 8,
        alignSelf: 'stretch',
        display: 'flex',
        flexDirection: 'row',
        borderRadius: 8
    },
    image: {
        width: 90,
        backgroundColor: COLOURS.WHITE,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center'

    },
    textContainer: {
        flex: 1,
        paddingLeft: 8
    },
    text: {
        fontSize: 24,
        fontFamily: 'Lato-Regular',
        color: COLOURS.WHITE
    }
})

export default class TeaRound extends Component {

    render() {
        return (
            <LinearGradient
                colors={ GRADIENTS.DARK }
                style={ styles.container }
            >
                <View style={ styles.image }>
                    <Image source={ ICONS.GROUP } />
                </View>
                <View style={ styles.textContainer } >
                    <Text style={ styles.text }>{ this.props.item.title }</Text>
                    <Text style={ styles.text }>{ this.props.item.members } Members</Text>
                </View>
            </LinearGradient>
        )
    }
}
