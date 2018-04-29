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
import LinearGradient from 'react-native-linear-gradient'
import { addMember, removeRound } from '../actions/dbActions'
import {
    IMAGES,
    ICONS,
    COLOURS,
    GRADIENTS
} from '../modules/constants'
import RoundMember from '../components/RoundMember'
import Button from '../components/Button'

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
        bottom: 15,
        right: 15
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

    showFriends() {
        // this.props.addMember()
        Actions.friends(this.props.data)
    }

    deleteRound(roundId) {
        this.props.removeRound(roundId)
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
            'rounds/' + this.props.data + '/members/'
        )
        this.listenForItems(this.itemsRef)
    }

    render() {
        return (
            !this.state.hasGroups ? <NoMembers /> :
                <LinearGradient
                    colors={GRADIENTS.STINGER_YELLOW}
                    style={styles.container}
                >
                    <ListView
                        style={ styles.scrollView }
                        dataSource={ this.state.dataSource }
                        renderRow={ this._renderItem.bind(this) }
                    />
                    <Button
                        style={ styles.addButton }
                        onPress={ this.showFriends.bind(this) }
                        radius={ 20 }
                        colour='white'
                        icon={ ICONS.PLUS }
                    />
                </LinearGradient>
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
        removeRound: removeRound
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Round)
