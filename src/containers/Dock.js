import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { changeSlideIndex } from '../actions/swiperActions'
import DockButton  from '../components/DockButton'
import { COLOURS, ICONS } from '../modules/constants'

type Props = {
    route: string,
    slide: number
}

class Dock extends Component<Props> {

    render() {
        return (
            // Do not display on the login screen
            this.props.route !== 'Login' &&
            <View style={ styles.container }>
                <View style={{
                    flexDirection: 'row',
                    width: 320
                }}>
                    <View style={ styles.layout }>
                        <DockButton
                            colour={ COLOURS.LIGHT_GREEN }
                            focused={ this.props.slide === 0 }
                            icon={ ICONS.GROUP_OUTLINE }
                            onPress={ () => { this.props.changeSlideIndex(0) } }
                        />
                    </View>
                    <View style={ styles.layout }>
                        <DockButton
                            colour={ COLOURS.YELLOW }
                            focused={ this.props.slide === 1 }
                            icon={ ICONS.BUZZ }
                            onPress={ () => { this.props.changeSlideIndex(1) } }
                        />
                    </View>
                    <View style={ styles.layout }>
                        <DockButton
                            colour={ COLOURS.LIGHT_BLUE }
                            focused={ this.props.slide === 2 }
                            icon={ ICONS.USER_OUTLINE }
                            onPress={ () => { this.props.changeSlideIndex(2) } }
                        />
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        alignSelf: 'flex-end',
        bottom: -10,
        right: 0,
        left: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    layout: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

function mapStateToProps(state) {
  return {
    route: state.route.scene.title,
    slide: state.slide.index
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ changeSlideIndex: changeSlideIndex }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Dock)

// @flow
