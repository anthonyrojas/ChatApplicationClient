import React, {Component} from 'react';
import {View, Text, TextInput, StyleSheet, Image, KeyboardAvoidingView, Keyboard, Modal} from 'react-native';
import { Button } from 'react-native-elements';
import {connect} from 'react-redux';

const styles = StyleSheet.create({
    containerStyle: {
        backgroundColor: '#D7D7D7',
        flex: 1,
        flexDirection: 'column',
        alignItems: 'stretch',
        justifyContent: 'flex-start'
    },
    inputItem:{
        fontSize: 16,
        marginHorizontal: 20,
        marginVertical: 10,
        borderRadius: 5,
        color: 'black',
        backgroundColor: 'white',
        textAlign: 'center',
        padding: 5,
    }
});

class CreateConversation extends Component{
    onCreateConversationPress(){}
    render(){
        return(
            <KeyboardAvoidingView style={styles.containerStyle}>
                <Image 
                    source={require('../Assets/chatbubble.png')}
                    style={{height: 80, width: 80, alignSelf: 'center', margin: 15}}
                />
                <TextInput style={styles.inputItem} 
                    placeholder="Phone"
                    underlineColorAndroid='transparent'
                    keyboardType='numeric'
                    onSubmitEditing={()=>{Keyboard.dismiss()}}
                />
                <Button
                    title='Create Conversation'
                    color='#09739A'
                    onPress={this.onCreateConversationPress.bind(this)}
                />
                <View style={{paddingHorizontal: 15}}>
                <Text>Enter the phone number of the person you would like to start a conversation with. Include the area code and country code, for example a US number would be: 13231234567</Text>
                </View>
            </KeyboardAvoidingView>
        );
    }
}
export default CreateConversation;