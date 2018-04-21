import React, {Component} from 'react';
import ActionButton from 'react-native-action-button';
import {View, Text, StyleSheet, AsyncStorage} from 'react-native';
import RNFS from 'react-native-fs';

const styles = {
    containerViewStyle:{}
}

const crypto = require('../crypto');

class Conversations extends Component{
    render(){
        return(
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'stretch', paddingHorizontal: 20}}>
                <Text>
                    This is the conversations page. Coming Soon...
                </Text>
                <Text>
                    {hash}
                </Text>
            </View>
        );
    }
}

export default Conversations;