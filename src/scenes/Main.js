import React, { Component } from 'react';
import {
  StyleSheet,
  Text
} from 'react-native';
import { connect } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import { GRADIENTS } from '../modules/constants';
import LoginButton from '../containers/LoginButton';

class Main extends Component {

  render() {
    return (
      <LinearGradient
        colors={ GRADIENTS.STINGER_YELLOW }
        style={ styles.container }
      >
        <Text
          style={{  marginBottom: 20, fontSize: 24 }}
        >Hello, { this.props.auth.user ? this.props.auth.user._user.displayName : 'user' }</Text>
        <LoginButton />
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

function mapStateToProps(state) {
  return {
    auth: state.authentication
  };
}

export default connect(mapStateToProps, null)(Main);
