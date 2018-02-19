import React, { Component } from 'react';
import {
    StyleSheet,
    View
} from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import DockButton  from '../components/DockButton';
import { COLOURS } from '../modules/constants';

const buttonRadius = 40;

class Dock extends Component {

    constructor() {
        super();

        // this.state.style = StyleSheet.create({
        //     width: buttonRadius * 2,
        //     height: buttonRadius * 2,
        //     borderRadius: buttonRadius,
        //     backgroundColor: COLOURS.LIGHT_GREEN
        // });
    }

    changeScene() {
      // Actions.main();
    }

    render() {
        console.log('dock render: ', this.props.route.scene.title);
        return (
            this.props.route.scene.title === 'Login' ?
            null
            :
            <View style={ styles.container }>
                <DockButton
                    // isFocused={ (this.props.routes }
                    colour={ COLOURS.LIGHT_GREEN }
                    // onClick={ this.changeScene() }
                />
                <DockButton
                    colour={ COLOURS.YELLOW }
                />
                <DockButton
                    colour={ COLOURS.LIGHT_BLUE }
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: -10,
    right: 0,
    left: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  circleButton: {
      width: buttonRadius * 2,
      height: buttonRadius * 2,
      borderRadius: buttonRadius,
      shadowColor: '#000000',
      shadowOffset: {
          width: 0,
          height: 1
      },
      shadowRadius: 4,
      shadowOpacity: 0.5
  }
});

function mapStateToProps(state) {
  return {
    route: state.route
  };
}

export default connect(mapStateToProps, null)(Dock);
