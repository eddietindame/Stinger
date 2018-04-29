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
import { addRound, removeRound } from '../actions/dbActions'
import {
    IMAGES,
    ICONS,
    COLOURS
} from '../modules/constants'
import TeaRound from '../components/TeaRound'
import Button from '../components/Button'

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
        right: 15
    }
})

const NoRounds = () => (
    <View style={ [styles.container, styles.noRounds] }>
        <Image
            source={ IMAGES.LOGO_DARK }
            style={{ marginBottom: 50 }}
        />
        <Text
            style={ styles.text }
        >No tea groups!</Text>
        <Text
            style={ styles.text }
        >Add one below...</Text>
    </View>
)

class Rounds extends Component {

    constructor() {
      super()

      this.state = {
         hasRounds: true,
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
          items.push({
            name: child.val().name,
            members: child.val().members,
            key: child.key
          })
        })

        this.setState({
            hasRows: items.length === 0 ? false : true,
            dataSource: this.state.dataSource.cloneWithRows(items)
        })
      })
    }

    _renderItem(item) {
        return (
          <TeaRound
            item={ item }
            onPress={ Actions.round }
          />
        )
    }

    componentDidMount() {
        this.itemsRef = firebase.database().ref(`users/${this.props.auth.user._user.uid}/rounds`)
        this.listenForItems(this.itemsRef)
    }

    render() {
        return (
            !this.state.hasRounds
                ? <NoRounds />
                : <View style={ styles.container }>
                    <ListView
                        style={ styles.scrollView }
                        dataSource={ this.state.dataSource }
                        renderRow={ this._renderItem.bind(this) }
                    />
                    <Button
                        style={ styles.addButton }
                        onPress={ this.props.addRound.bind(this) }
                        radius={ 20 }
                        colour='white'
                        icon={ ICONS.PLUS }
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
        addRound: addRound,
        removeRound: removeRound
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Rounds)
