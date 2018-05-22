import axios from 'axios';
import React from 'react';
import RNFS from 'react-native-fs';
import {AsyncStorage} from 'react-native';
import {host, EMPTY_STR, filePathDir} from '../config';
import {
    OPEN_CONVERSATION,
    FETCH_MESSAGES,
    FETCH_MESSAGES_FAIL,
    FETCH_MESSAGES_SUCCESS,
    SEND_MESSAGE,
    SEND_MESSAGE_FAIL,
    SEND_MESSAGE_SUCCESS,
    MESSAGE_CONTENT_CHANGED
} from './types';
import {encryptor, decryptor} from '../CryptoFunctions';
export const messageContentChanged = (text)=>{
    return{
        type: MESSAGE_CONTENT_CHANGED,
        payload: text
    }
}

export const fetchMessagesFail = (dispatch, data)=>{
    dispatch({
        type: FETCH_MESSAGES_FAIL,
        payload: data
    });
}

export const fetchMessagesSuccess = (dispatch, data)=>{
    dispatch({
        type: FETCH_MESSAGES_SUCCESS,
        payload: data
    });
}

export const fetchMessages = ({conversationID}) =>{
    return (dispatch)=>{
        dispatch({
            type: FETCH_MESSAGES,
            payload: true
        });
        AsyncStorage.getItem('@CryptoChat:myID')
        .then(myId => {
            AsyncStorage.getItem('@CryptoChat:authToken').then(tokenData => {
                //successfully fetched token from AsyncStorage
                const config = {
                    headers: {
                        authorization: tokenData
                    }
                };
                axios.get(host + `/api/chat/${conversationID}/messages`, config).then(msgRes => {
                    if(msgRes){
                        //the message was sent by someone else
                        const keyPath = `${filePathDir}/MyKey/private.pem`;
                        let messages = msgRes.data.messages;
                        messages.foreach(msg => {
                            if(msg.sender._id === myId){
                                msg.senderContent = JSON.parse(msg.senderContent);
                                msg.senderContent = decryptor(msg.senderContent, keyPath);
                            }else{
                                msg.content = JSON.parse(msg.content);
                                msg.content = decryptor(msg.content, keyPath);
                            }
                        });
                        //messages done decrypting
                        fetchMessagesSuccess(dispatch, messages);
                    }else{
                        //no messages
                        fetchMessagesSuccess(dispatch, []);
                    }
                }).catch(msgErr => {
                    fetchMessagesFail(dispatch, true);
                });
            }).catch(tokenErr => {
                //handle error: unable to fetch token from AsyncStorage
                fetchMessagesFail(dispatch, true);
            });
        }).catch(idErr => {
            //unable to fetch my user id from database
            fetchMessagesFail(dispatch, true);
        });
    }
};

export const openConversation = ({conversationID})=>{
    return (dispatch)=>{
        dispatch({
            type: OPEN_CONVERSATION,
            payload: true,
        });
        AsyncStorage.getItem('@CryptoChat:authToken').then(tokenData => {
            const config = {
                headers: {
                    authorization: tokenData
                }
            };
            //get the keys for this conversation
            axios.get(host + '/api/chat/keys/' + conversationID, config).then(keysRes => {
                if(keysRes){
                    let userArr = keysRes.data.users;
                    //check if keys exist in the local file system
                    userArr.forEach(user => {
                        let keyFileName = filePathDir + '/' + user._id.toString() + '.pem';
                        RNFS.exists(keyFileName).then(exists => {
                            if(exists){
                                //the key already exists in the local file system, do nothing
                            }else{
                                //the key does not exist and needs to be written in
                                RNFS.writeFile(keyFileName, user.publicKey, 'utf8').then(successWrite => {
                                    //console.log('Public key saved successfully');
                                    //key written successfully
                                }).catch(writeErr => {
                                    //error saving keys
                                    fetchMessagesFail(dispatch, true);
                                });
                            }
                        }).catch(existsErr =>{
                            console.log('Could not check if a file exists');
                        });
                    });
                }else{
                    console.log('There are no keys');
                }
            }).catch(keyErr => {
                //error obtaining key from server
                console.log('Could not obtain public keys');
            })
        }).catch(tokenErr => {
            //error readint the auth token from Async Storage (the DB)
            fetchMessagesFail(dispatch, true);
        });
    }
}

export const sendMessageFail = (dispatch, data)=>{
    dispatch({
        type: SEND_MESSAGE_FAIL,
        payload: data
    });
}

export const sendMessageSuccess = (dispatch, data)=>{
    dispatch({
        type: SEND_MESSAGE_SUCCESS,
        payload: data
    });
}

//send single one-to-one message, group message will have different action
export const sendMessage = ({conversationID, content})=>{
    return(dispatch)=>{
        dispatch({
            type: SEND_MESSAGE,
            payload: true
        });
        AsyncStorage.getItem('@CryptoChat:authToken').then(token=>{
            const config = {
                headers: {
                    authorization: token
                }
            };
            axios.get(`${host}/api/chat/keys/${conversationID}`, config).then(users =>{
                const receiver = users.data.users[0]._id;
                var encryptedMsg = encryptor(content, `${filePathDir}/${receiver}.pem`);
                var myMsg = encryptor(content, `${filePathDir}/MyKey/public.pem`);
                console.log(`Encrypted message with other user key: ${encryptedMsg}`);//remove
                console.log(`Encrypted message with my key: ${myMsg}`);
                var data = {
                    content: encryptedMsg,
                    senderContent: myMsg
                }
                axios.post(`${host}/api/chat/${conversationID}/message`, data, config)
                .then(msgSent =>{
                    sendMessageSuccess(dispatch, true);
                    //refresh the messages
                }).catch(msgErr =>{
                    //unable to send the message
                    sendMessageFail(dispatch, true);
                });
            }).catch(userErr=>{
                //unable to get the keys and ids from the server
                console.log(userErr.toString());//remove
                sendMessageFail(dispatch, true);
            });
        }).catch(tokenErr => {
            sendMessageFail(dispatch, true);
        });
    }
}