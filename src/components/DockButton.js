import React, { Component } from 'react';
import {
  StyleSheet,
  TouchableOpacity
} from 'react-native';

const buttonRadius = 40;

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
        elevation: 6
    }
});

export default class DockButton extends Component {

    constructor() {
        super();

        // this.state.style = StyleSheet.create({
        //     width: buttonRadius * 2,
        //     height: buttonRadius * 2,
        //     borderRadius: buttonRadius,
        //     backgroundColor: COLOURS.LIGHT_GREEN
        // });
    }

  render() {
    return (
        <TouchableOpacity
            style={[
                styles.dockButton,
                {
                    width: buttonRadius * 2,
                    height: buttonRadius * 2,
                    borderRadius: buttonRadius,
                    backgroundColor: this.props.colour
                }
            ]}
        />
    );
  }
}
