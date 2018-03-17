import React, { Component } from 'react'
import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    Image,
    ListView,
    Platform
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
        paddingTop: Platform.OS === 'ios' ? 25 : 15,
        paddingBottom: 85,
        paddingHorizontal: 20,
        // justifyContent: 'flex-start',
        // alignItems: 'stretch'
    },
    doubleColumn: {
        flexDirection: 'row',
        // justifyContent: 'space-between',
        // alignItems: 'stretch',
        // backgroundColor: 'red'
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
    moreButton: {
        position: 'absolute',
        bottom: 90,
        right: 15
    },
    options: {
        // position: 'absolute',
        // backgroundColor: 'red',
        // // flex: 1,
        // right: -20,
        // bottom: 0
    }
})

class Profile extends Component {

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
            <View style={ styles.container }>
                <Text style={ styles.heading }>Profile</Text>

                <TextField
                    label='Nickname'
                    value='Hilda'
                />
                <TextField
                    label='Favourite drink'
                    value='Camomile tea'
                />

                <View style={ styles.doubleColumn }>
                    <View style={{ flex: 1, marginRight: 4 }}>
                        <TextField
                            label='Milk'
                            value='None'
                        />
                    </View>
                    <View style={{ flex: 1, marginLeft: 4 }}>
                        <Counter
                            label='Sugar'
                            value={ 0 }
                        />
                    </View>
                </View>

                <Options
                    open={ this.state.options ? true : false }
                />

                <Button
                    style={[
                        styles.moreButton,
                        { bottom: this.state.options ? 190 : 90 }
                    ]}
                    onPress={ this.toggleOptions.bind(this) }
                    radius={ 20 }
                    colour='white'
                    icon={ ICONS.OPTIONS }
                />
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

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
