import React, { Component } from 'react'
import {
  StyleSheet,
  TouchableOpacity,
  Image,
  LayoutAnimation,
  View,
  UIManager
} from 'react-native'

UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);

const buttonRadius = 40

const styles = StyleSheet.create({
    dockButton: {
        width: buttonRadius * 2,
        height: buttonRadius * 2,
        borderRadius: buttonRadius,
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 6
        },
        shadowRadius: 4,
        shadowOpacity: 0.2,
        elevation: 6,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default class DockButton extends Component {

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
            style={[
                styles.dockButton,
                {
                    width: buttonRadius * 2 * (this.props.focused ? 1.2 : 1),
                    height: buttonRadius * 2 * (this.props.focused ? 1.2 : 1),
                    borderRadius: buttonRadius * (this.props.focused ? 1.2 : 1),
                    backgroundColor: this.props.colour
                }
            ]}
        >
            <Image source={ this.props.icon } />
        </TouchableOpacity>
    )
  }
}
