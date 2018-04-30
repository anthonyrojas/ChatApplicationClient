import React, {Component} from 'react';
import RNFS from 'react-native-fs';
import {View, Text, FlatList, StyleSheet} from 'react-native';
import {List, ListItem} from 'react-native-elements';
import {connect} from 'react-redux';
import {encryptor, decryptor} from '../cryptoFunctions';

class Conversation extends Component{
    render(){
        return(
            <View>
                <Text>Coming soon...</Text>
            </View>
        );
    }
}

export default Conversation;