import React, {Component} from 'react';
import ActionButton from 'react-native-action-button';
import {View, Text, StyleSheet, AsyncStorage} from 'react-native';

const styles = {
    containerViewStyle:{}
}

class Conversations extends Component{
    render(){
        return(
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'stretch'}}>
                <Text>
                    This is the conversations page. Coming Soon...
                </Text>
            </View>
        );
    }
}

export default Conversations;