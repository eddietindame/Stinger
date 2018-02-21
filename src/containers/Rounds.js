import React, { Component } from 'react'
import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    Image,
    ScrollView,
    Platform
} from 'react-native'
import { connect } from 'react-redux'
import {
    IMAGES,
    ICONS,
    COLOURS
} from '../modules/constants'
import TeaRound from '../components/TeaRound'

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

const AddButton = () => (
    <TouchableOpacity
        style={ styles.addButton }
    >
        <Image source={ ICONS.PLUS } />
    </TouchableOpacity>
)

class Rounds extends Component {

    constructor() {
      super()

      this.state = {
         hasGroups: true
      }
    }

    render() {
        return (
            !this.state.hasGroups ? <NoRounds /> :
            <View style={ styles.container }>
                <ScrollView style={ styles.scrollView }>
                    <TeaRound
                        name={ 'Work' }
                        members={ 6 }
                    />
                    <TeaRound
                        name={ 'Home' }
                        members={ 3 }
                    />
                    <TeaRound
                        name={ 'London' }
                        members={ 8 }
                    />
                    <TeaRound
                        name={ 'Work' }
                        members={ 6 }
                    />
                    <TeaRound
                        name={ 'Home' }
                        members={ 3 }
                    />
                    <TeaRound
                        name={ 'London' }
                        members={ 8 }
                    />
                    <TeaRound
                        name={ 'Work' }
                        members={ 6 }
                    />
                    <TeaRound
                        name={ 'Home' }
                        members={ 3 }
                    />
                    <TeaRound
                        name={ 'London' }
                        members={ 8 }
                    />
                </ScrollView>
                <AddButton />
            </View>
        )
    }
}

export default connect(null, null)(Rounds)
