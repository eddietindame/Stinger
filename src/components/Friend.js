import React, { Component } from 'react'
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableHighlight
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
        alignSelf: 'stretch',
        borderRadius: 8
    },
    inner: {
        flexDirection: 'row',
        borderRadius: 8,
        padding: 8,
        flex: 1
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

    constructor(props) {
        super(props)

        this.state = {
            selected: false
        }
    }

    onPress() {
        this.setState({
            selected: !this.state.selected
        })

        this.props.onPress()
    }

    render() {
        return (
            <TouchableHighlight
                onPress={ this.onPress.bind(this) }
                style={ styles.container }
            >
                <LinearGradient
                    colors={ this.state.selected ? GRADIENTS.FACEBOOK_BLUE : GRADIENTS.DARK }
                    style={ styles.inner }
                >
                    <Image
                        source={{ uri: this.props.item.photoUrl }}
                        style={ styles.image }
                    />
                    <View style={ styles.textContainer } >
                        <Text style={ styles.text }>{ this.props.item.name }</Text>
                        <Text style={ styles.text }>{ this.props.item.fbid }</Text>
                        <Text style={[ styles.text, { fontSize: 18 } ]}>Id: { this.props.item.key }</Text>
                    </View>
                </LinearGradient>
            </TouchableHighlight>
        )
    }
}
