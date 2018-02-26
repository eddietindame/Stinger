import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Platform
} from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import firebase from 'react-native-firebase'
import LinearGradient from 'react-native-linear-gradient'
import Swiper from 'react-native-swiper'
import { GRADIENTS } from '../modules/constants'
import { slideIndexChanged } from '../actions/index'
import LoginButton from '../containers/LoginButton'
import Rounds from '../containers/Rounds'

class Main extends Component {

  constructor() {
    super()

    this.itemsRef = firebase.database().ref();
  }

  listenForItems(itemsRef) {
    itemsRef.on('value', (snap) => {

      // get children as an array
      var items = [];
      snap.forEach((child) => {
        items.push({
          title: child.val().title,
          _key: child.key
        });
      });

      console.log(items);
    });
  }

  componentDidMount() {
    this.listenForItems(this.itemsRef);
  }

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
          index={ this.props.slide.index }
          onIndexChanged={ index => { this.props.slideIndexChanged(index) } }
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
    )
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
})

function mapStateToProps(state) {
  return {
    auth: state.authentication,
    slide: state.slide
  }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ slideIndexChanged: slideIndexChanged }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Main)
