import React, { Component } from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import { connect } from 'react-redux';
import { IMAGES } from '../modules/constants';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 150,
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    text: {
        fontSize: 24,
        fontFamily: 'Lato-Regular'
    }
});

const NoGroups = () => (
    <View style={ styles.container }>
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
);

class Rounds extends Component {

    constructor(props) {
      super(props);
    
      this.state = {
         hasGroups: false
      };
    }

    render() {
        return (
            !this.state.hasGroups ? <NoGroups /> :
            <View style={ styles.container }>
                <Text
                    style={ styles.text }
                >You have groups</Text>
            </View>
        );
    }
}

export default connect(null, null)(Rounds);
