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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Platform.OS === 'ios' ? 25 : 10,
        paddingBottom: 85,
        paddingHorizontal: 10,
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    scrollView: {
        flex: 1,
        alignSelf: 'stretch'
    },
    noRounds: {
        paddingTop: 150
    },
    text: {
        fontSize: 24,
        fontFamily: 'Lato-Regular'
    }
})

class Profile extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>Profile</Text>
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
    return bindActionCreators({}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
