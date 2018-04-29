import React, { Component } from 'react'
import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    Image,
    ListView,
    Platform,
    Slider,
    PanResponder,
    Dimensions
} from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { ICONS } from '../modules/constants'
import { hideDock, showDock } from '../actions/swiperActions'
import TextField from '../components/TextField'
import Counter from '../components/Counter'
import Button from '../components/Button'
import Options from '../components/Options'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        paddingTop: Platform.OS === 'ios' ? 25 : 15,
        paddingBottom: 85,
        paddingHorizontal: 20
    },
    heading: {
        fontFamily: 'CircularStd-Book',
        fontSize: 36,
        paddingBottom: 10
    },
    text: {
        fontFamily: 'CircularStd-Book',
        fontSize: 24
    },
    item: {
        display: 'none'
    }
})

const { width, height } = Dimensions.get('window')

class Buzz extends Component {

    constructor(props) {
        super(props)

        this.state = {
            options: false
        }
    }

    toggleOptions() {
        this.state.options ? this.props.showDock() : this.props.hideDock()
        this.setState({
            options: !this.state.options
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={{ flex: 4, backgroundColor: 'red' }}>
                    <Text
                        style={[
                            { marginBottom: 20, fontSize: 24 },
                            styles.lato
                        ]}
                    >Hello,
                    {this.props.auth.user
                        ? ' ' + this.props.auth.user._user.displayName
                        : ' user'}
                    </Text>
                    <Text
                        style={[
                            { marginBottom: 20, fontSize: 24 },
                            styles.lato
                        ]}
                    >Middle slide</Text>
                </View>
                <View style={{ flex: 1, justifyContent: 'center' }}>
                </View>
            </View>
        )
    }
}

function mapStateToProps(state) {
    return {
        auth: state.db
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        hideDock: hideDock,
        showDock: showDock
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Buzz)
