import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  Image,
  Animated
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import { loginSuccess, logoutSuccess } from '../actions/index';
import { COLOURS, GRADIENTS, IMAGES } from '../modules/constants';
import LoginButton from '../containers/LoginButton';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 100,
    justifyContent: 'space-around',
    alignItems: 'center',
    // backgroundColor: '#FDC132'
    backgroundColor: COLOURS.YELLOW
  },
  button: {
    width: 100,
    height: 50,
    marginTop: 50,
    // backgroundColor: '#314f89'
    backgroundColor: COLOURS.BLUE
  },
  text: {
    fontFamily: 'Lato-Regular',
    fontSize: 18
  },
  brand: {
    fontFamily: 'Lato-Black',
    fontSize: 48
  }
});

class Login extends Component {

  constructor() {
    super();

    this.state = {
      slide: new Animated.ValueXY({ x: 0, y: -2000 })
    };

    this.slideIn = Animated.spring(
      this.state.slide,
      {
        toValue: 2
      }
    );
  }

  componentDidMount() {
    this.slideIn.start();
  }

  render() {
    const slideStyle = { transform: [
      { translateX: this.state.slide.x },
      { translateY: this.state.slide.y }
    ] };

    return (
      <LinearGradient
        colors={ GRADIENTS.STINGER_YELLOW }
        style={ styles.container }
      >
        <Image
          source={ IMAGES.LOGO }
        />
        <Text style={ styles.brand }>Stinger</Text>
        <Text style={ styles.text }>Sign in to start using Stinger!</Text>
        <Animated.View style={ slideStyle }>
          <LoginButton />
        </Animated.View>
      </LinearGradient>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.authentication
  };
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({ loginSuccess:  loginSuccess,
                              logoutSuccess: logoutSuccess }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Login);
