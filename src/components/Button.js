import React, { Component } from 'react'
import {
  StyleSheet,
  TouchableOpacity,
  Image,
  LayoutAnimation,
  UIManager
} from 'react-native'

type Props = {
    onPress: any,
    radius: number,
    colour: string,
    icon: string,
    style: any
}

// Android drop shadows
UIManager.setLayoutAnimationEnabledExperimental
    && UIManager.setLayoutAnimationEnabledExperimental(true);

const styles = StyleSheet.create({
    button: {
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 6
        },
        shadowRadius: 4,
        shadowOpacity: 0.2,
        elevation: 6,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default class Button extends Component<Props> {

    componentWillUpdate() {
        LayoutAnimation.configureNext({
            duration: 200,
            update: {
                type: 'linear'
            }
        })
    }

    render() {
        return (
            <TouchableOpacity
                onPress={ this.props.onPress }
                style={[
                    styles.button,
                    {
                        width: this.props.radius * 2 * (this.props.focused ? 1.2 : 1),
                        height: this.props.radius * 2 * (this.props.focused ? 1.2 : 1),
                        borderRadius: this.props.radius * (this.props.focused ? 1.2 : 1),
                        backgroundColor: this.props.colour
                    },
                    this.props.style
                ]}
            >
                <Image source={ this.props.icon } />
            </TouchableOpacity>
        )
    }
}

// @flow
