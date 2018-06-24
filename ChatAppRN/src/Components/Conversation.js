import React, {Component} from 'react';
import {View, Text, FlatList, StyleSheet, Platform, TextInput, Keyboard} from 'react-native';
import {EMPTY_STR} from '../config';
import {List, ListItem, Button} from 'react-native-elements';
import {connect} from 'react-redux';
import {encryptor, decryptor} from '../CryptoFunctions';
import {
    OPEN_CONVERSATION,
    FETCH_MESSAGES,
    FETCH_MESSAGES_FAIL,
    FETCH_MESSAGES_SUCCESS,
    SEND_MESSAGE,
    SEND_MESSAGE_FAIL,
    SEND_MESSAGE_SUCCESS
} from '../Actions/types';
import {
    openConversation,
    fetchMessages,
    fetchMessagesFail,
    fetchMessagesSuccess,
    sendMessage,
    sendMessageFail,
    sendMessageSuccess,
    messageContentChanged
} from '../Actions/index';
import Message from './Message';

const styles = StyleSheet.create({
    containerViewStyle:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'stretch',
        flexDirection: 'column',
        alignContent:'stretch'
    },
    inputMessageStyle:{
        color: 'black',
        backgroundColor: 'white',
        paddingHorizontal: 3,
        fontSize: 16,
        paddingVertical: 8
    }
});

class Conversation extends Component{
    constructor(props){
        super(props);
        this.props.openConversation({conversationID: this.props.navigation.state.params.id});
    }
    onMessageContentChanged(text){
        this.props.messageContentChanged(text);
    }
    componentDidMount(){
        this.props.fetchMessages({conversationID: this.props.navigation.state.params.id});
    }
    onSendMessage(){
        Keyboard.dismiss();
        if(this.props.messageContent === EMPTY_STR){
            //the message the user is trying to send is empty
        }else{
            //valid message
            this.props.sendMessage({conversationID: this.props.navigation.state.params.id, content: this.props.messageContent});
        }
    }
    render(){
        return(
            <View style={styles.containerViewStyle}>
                <FlatList
                data={this.props.messageList}
                key='messages'
                keyExtractor={(msg, i)=>msg.id}
                renderItem={({msg})=>
                    <Message
                        key={msg.id}
                        title={msg.name}
                        rightTitle={msg.created}
                        caption={msg.content}
                    />
                }
                />
                <TextInput 
                underlineColorAndroid='transparent'
                style={styles.inputMessageStyle}
                placeholder="Enter message"
                onChangeText={this.onMessageContentChanged.bind(this)}
                onSubmitEditing={()=>{Keyboard.dismiss();}}
                />
                <Button
                title="Send"
                backgroundColor="#5CC9FF"
                color="white"
                onPress={this.onSendMessage.bind(this)}
                />
            </View>
        );
    }
}

const mapStateToProps = state=>({
    messageList: state.singleConversation.messageList,
    messageListError: state.singleConversation.messageListError,
    messageListSuccess: state.singleConversation.messageListSuccess,
    fetchingMessages: state.singleConversation.fetchingMessages,
    sendingMessageFailure: state.singleConversation.sendingMessageFailure,
    sendingMessageSuccess: state.singleConversation.sendingMessageSuccess,
    sendingMessage: state.singleConversation.sendingMessage,
    loadingConversation: state.singleConversation.loadingConversation,
    messageContent: state.singleConversation.messageContent
});
export default connect(mapStateToProps,{
    openConversation,
    fetchMessages,
    fetchMessagesFail,
    fetchMessagesSuccess,
    sendMessage,
    sendMessageFail,
    sendMessageSuccess,
    messageContentChanged
})(Conversation);