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
import firebase from 'react-native-firebase'
import {
    IMAGES,
    ICONS,
    COLOURS
} from '../modules/constants'
import RoundMember from '../components/RoundMember'
import { addRound, removeRound } from '../actions/dbActions'

const buttonRadius = 20

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
    },
    addButton: {
        position: 'absolute',
        bottom: 90,
        right: 15,
        width: buttonRadius * 2,
        height: buttonRadius * 2,
        backgroundColor: COLOURS.WHITE,
        borderRadius: buttonRadius,
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 6
        },
        shadowRadius: 4,
        shadowOpacity: 0.2,
        elevation: 6,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

const NoMembers = () => (
    <View style={ [styles.container, styles.noRounds] }>
        <Image
            source={ IMAGES.LOGO_DARK }
            style={{ marginBottom: 50 }}
        />
        <Text
            style={ styles.text }
        >No members!</Text>
        <Text
            style={ styles.text }
        >Add one below...</Text>
    </View>
)

class Round extends Component {

    constructor() {
        super()

        this.state = {
            hasGroups: true,
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2
            })
        }

        this.deleteRound = this.deleteRound.bind(this)
    }

    listenForItems(itemsRef) {
        itemsRef.on('value', snap => {
            // get children as an array
            let items = []
            snap.forEach(child => {
                items.push({
                    name: child.val().name,
                    fbid: child.val().fbid,
                    photoUrl: child.val().photoUrl,
                    _key: child.key
                })
            })

            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(items)
            })
        })
    }

    addRound() {
        this.props.addRound()
    }

    deleteRound(roundID) {
        this.props.removeRound(roundID)
    }

    _renderItem(item) {
        return (
            <RoundMember
                item={ item }
                onPress={ () => {} }
            />
        )
    }

    componentDidMount() {
        this.itemsRef = firebase.database().ref(
            'users/' + this.props.auth.user._user.uid + '/rounds/' + this.props.data + '/members/'
        )
        this.listenForItems(this.itemsRef)
        console.log(this.props)
    }

    render() {
        return (
            !this.state.hasGroups ? <NoMembers /> :
                <View style={ styles.container }>
                    <ListView
                        style={ styles.scrollView }
                        dataSource={ this.state.dataSource }
                        renderRow={ this._renderItem.bind(this) }
                    />
                    <TouchableOpacity
                        style={ styles.addButton }
                        onPress={ this.addRound.bind(this) }
                    >
                        <Image source={ ICONS.PLUS } />
                    </TouchableOpacity>
                </View>
        )
    }
}

function mapStateToProps(state) {
    return {
        auth: state.authentication
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        addRound: addRound,
        removeRound: removeRound
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Round)
