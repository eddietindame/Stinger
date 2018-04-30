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
import { removeMember, settleRound } from '../actions/dbActions'
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
    },
    settleButton: {
        position: 'absolute',
        bottom: 15,
        // right: 15
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
    }

    listenForItems(itemsRef) {
        itemsRef.on('value', snap => {
            // get children as an array
            let items = []
            snap.forEach(child => {
                const { name, uid, fbid, photoUrl } = child.val()

                items.push({
                    name,
                    fbid,
                    photoUrl,
                    key: child.key
                })
            })

            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(items)
            })
        })
    }

    showFriends() {
        Actions.friends(this.props.data)
    }

    _renderItem(item) {
        return (
            <RoundMember
                item={ item }
                onPress={() => {
                    this.props.removeMember(item.key, this.props.data)
                }}
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
            !this.state.hasGroups
                ? <NoMembers />
                : <LinearGradient
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
                    <Button
                        style={ styles.settleButton }
                        onPress={() => { this.props.settleRound(this.props.data) }}
                        radius={ 20 }
                        colour='white'
                        icon={ ICONS.GROUP }
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
        removeMember: removeMember,
        settleRound: settleRound
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Round)
