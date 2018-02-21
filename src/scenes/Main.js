import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Platform
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import Swiper from 'react-native-swiper';
import { GRADIENTS } from '../modules/constants';
import { slideIndexChanged } from '../actions/index';
import LoginButton from '../containers/LoginButton';
import Rounds from '../containers/Rounds';

class Main extends Component {

  render() {
    return (
      <LinearGradient
        colors={ GRADIENTS.STINGER_YELLOW }
        style={ styles.container }
      >
        <Swiper
          style={ Platform.OS === 'android' ? { width: Dimensions.get('window').width } : null }
          loop={ false }
          showsPagination={ false }
          index={ 1 }
          onIndexChanged={ index => { this.props.slideIndexChanged(index); } }
        >
          <Rounds
            user={ this.props.auth.user }
          />
          <View style={ styles.container }>
            <Text
              style={[{ marginBottom: 20, fontSize: 24 }, styles.lato]}
            >Hello, { this.props.auth.user ? this.props.auth.user._user.displayName : 'user' }</Text>
            <Text
              style={[{ marginBottom: 20, fontSize: 24 }, styles.lato]}
            >Middle slide</Text>
            <LoginButton />
          </View>
          <View style={ styles.container }>
            <Text
              style={[{ marginBottom: 20, fontSize: 24 }, styles.lato]}
            >Hello, { this.props.auth.user ? this.props.auth.user._user.displayName : 'user' }</Text>
            <Text
              style={[{ marginBottom: 20, fontSize: 24 }, styles.lato]}
            >Right slide</Text>
            <LoginButton />
          </View>
        </Swiper>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  swiper: {
    width: 300
  },
  lato: {
    fontFamily: 'Lato-Regular'
  }
});

function mapStateToProps(state) {
  return {
    auth: state.authentication
  };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ slideIndexChanged: slideIndexChanged }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);
