import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import { connect } from 'react-redux';
import LoginButton from '../components/LoginButton';

class Main extends Component {

  render() {
    return (
      <View style={ styles.container }>
        <Text
          style={{  marginBottom: 20 }}
        >Hello, { this.props.auth.user ? this.props.auth.user._user.displayName : 'poop' }</Text>
        <LoginButton />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FDC132'
  }
});

function mapStateToProps(state) {
  return {
    auth: state.authentication
  };
}

export default connect(mapStateToProps, null)(Main);
