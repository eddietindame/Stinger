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
import TeaRound from '../components/TeaRound'
import { addRound } from '../actions/dbActions';

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

// const AddButton = () => (
//     <TouchableOpacity
//         style={ styles.addButton }
//         onPress={ this.props.onPress }
//     >
//         <Image source={ ICONS.PLUS } />
//     </TouchableOpacity>
// )

class Rounds extends Component {

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
      itemsRef.on('value', (snap) => {

        // get children as an array
        var items = []
        snap.forEach((child) => {
          items.push({
            title: child.val().name,
            members: child.val().number,
            _key: child.key
          })
        })

        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(items)
        })
      });
    }

    onPress() {
        this.props.addRound(this.props.auth.user._user.uid)
    }

    _renderItem(item) {
        return (
          <TeaRound
            item={ item }
          />
        )
    }

    componentDidMount() {
        this.itemsRef = firebase.database().ref('users/' + this.props.auth.user._user.uid + '/rounds')
        this.listenForItems(this.itemsRef)
    }

    render() {
        return (
            !this.state.hasGroups ? <NoRounds /> :
            <View style={ styles.container }>
                <ListView
                    style={ styles.scrollView }
                    dataSource={ this.state.dataSource }
                    renderRow={ this._renderItem.bind(this) }
                />
                {/* <AddButton
                    onPress={ this.onPress }
                /> */}
                <TouchableOpacity
                    style={ styles.addButton }
                    onPress={ this.onPress.bind(this) }
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
    return bindActionCreators({ addRound: addRound }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Rounds)
