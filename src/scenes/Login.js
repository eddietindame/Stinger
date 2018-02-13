import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  Animated
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import LoginButton from '../components/LoginButton';
import { loginSuccess, logoutSuccess } from '../actions/index';
import { COLOURS } from '../modules/constants';

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
        // colors={['#4c669f', '#3b5998', '#192f6a']}
        colors={['#FAD961', '#FFD400']}
        style={ styles.container }
      >
        <Image
          source={ require('../img/StingerLogo.png') }
        />
        <Text>{ this.props.auth.user ? '' : 'Sign in to start using Stinger!' }</Text>
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
