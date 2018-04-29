import React, { Component } from 'react'
import { StyleSheet, Text, View, Dimensions, Platform } from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Swiper from 'react-native-swiper'
import LinearGradient from 'react-native-linear-gradient'
import { GRADIENTS } from '../modules/constants'
import { slideIndexChanged } from '../actions/swiperActions'
import LoginButton from '../containers/LoginButton'
import Rounds from '../containers/Rounds'
import Profile from '../containers/Profile'
import Buzz from '../containers/Buzz'

class Main extends Component {
    componentWillReceiveProps(nextProps) {
        if (this.props.slide.newIndex !== nextProps.slide.newIndex) {
            this._swiper.scrollBy(
                nextProps.slide.newIndex - this.props.slide.index
            )
        } else if (
            this.props.slide.changed === true &&
            nextProps.slide.changed === false
        ) {
            this._swiper.scrollBy(
                nextProps.slide.newIndex - this.props.slide.index
            )
        }
    }

    render() {
        return (
            <LinearGradient
                colors={GRADIENTS.STINGER_YELLOW}
                style={styles.container}
            >
                <Swiper
                    style={
                        Platform.OS === 'android'
                            ? { width: Dimensions.get('window').width }
                            : null
                    }
                    loop={false}
                    showsPagination={false}
                    index={2}
                    onIndexChanged={index => {
                        this.props.slideIndexChanged(index)
                    }}
                    ref={swiper => {
                        this._swiper = swiper
                    }}
                >
                    <Profile />
                    <Buzz />
                    <Rounds user={this.props.auth.user} />
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
    return bindActionCreators(
        { slideIndexChanged: slideIndexChanged },
        dispatch
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(Main)
