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
import { Actions } from 'react-native-router-flux'
import firebase from 'react-native-firebase'
import {
    IMAGES,
    ICONS,
    COLOURS
} from '../modules/constants'
import Friend from '../components/Friend'
import { addMember, removeMember } from '../actions/dbActions'

const buttonRadius = 20

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Platform.OS === 'ios' ? 25 : 10,
        paddingBottom: 10,
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

const NoFriends = () => (
    <View style={ [styles.container, styles.noRounds] }>
        <Image
            source={ IMAGES.LOGO_DARK }
            style={{ marginBottom: 50 }}
        />
        <Text
            style={ styles.text }
        >No Friends!</Text>
        <Text
            style={ styles.text }
        >Add one below...</Text>
    </View>
)

class Friends extends Component {

    constructor() {
        super()

        this.state = {
            hasGroups: true,
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2
            })
        }

        this.removeMember = this.removeMember.bind(this)
    }

    listenForItems(itemsRef) {
        itemsRef.on('value', snap => {
            // get children as an array
            let items = []
            // console.log(snap)
            snap.forEach(child => {
                console.log(child)
                items.push({
                    name: child.val().name,
                    fbid: child.val().id,
                    photoUrl: child.val().photoUrl,
                    _key: child.key
                })
            })

            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(items)
            })
        })
    }

    addMember(roundId, fbid, name, photoUrl) {
        // console.log(roundId, fbid, name, photoUrl)
        this.props.addMember(roundId, fbid, name, photoUrl)
    }

    removeMember(roundId) {
        this.props.removeMember(roundId)
    }

    _renderItem(item) {
        return (
            <Friend
                item={ item }
                onPress={() => {
                    console.log(item)
                    this.addMember(this.props.data, item.fbid, item.name, item.photoUrl)
                }}
            />
        )
    }

    componentDidMount() {
        this.itemsRef = firebase.database().ref(
            'users/' + this.props.auth.user._user.uid + '/friends'
        )
        this.listenForItems(this.itemsRef)
    }

    render() {
        return (
            !this.state.hasGroups ? <NoFriends /> :
                <View style={ styles.container }>
                    <ListView
                        style={ styles.scrollView }
                        dataSource={ this.state.dataSource }
                        renderRow={ this._renderItem.bind(this) }
                    />
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
        addMember: addMember,
        removeMember: removeMember
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Friends)
