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

    render() {
        return (
            this.props.route.scene.title === 'Login' ? null :
            <View style={ styles.container }>
                <DockButton
                    colour={ COLOURS.LIGHT_GREEN }
                    focused={ this.props.slide.index === 0 ? true : false }
                />
                <DockButton
                    colour={ COLOURS.YELLOW }
                    focused={ this.props.slide.index === 1 ? true : false }
                />
                <DockButton
                    colour={ COLOURS.LIGHT_BLUE }
                    focused={ this.props.slide.index === 2 ? true : false }
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
    route: state.route,
    slide: state.slide
  };
}

export default connect(mapStateToProps, null)(Dock);
