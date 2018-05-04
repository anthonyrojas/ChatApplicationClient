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
} from './types';
import {
    encryptor,
    decryptor
} from '../cryptoFunctions';

export const fetchMessagesFail = (dispatch, data)=>{
    dispatch({
        type: FETCH_MESSAGES_FAIL,
        payload: true
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
        AsyncStorage.getItem('@CryptoChat:authToken').then(tokenData => {
            //successfully fetched token from AsyncStorage
            const config = {
                headers: {
                    authorization: tokenData
                }
            };
            axios.get(host + `/api/chat/${conversationID}/messages`, config).then(msgRes => {
                if(msgRes){
                    const keyPath = `${filePathDir}/MyKey/private.pem`;
                    let messages = msgRes.data.messages;
                    messages.foreach(msg => {
                        msg.content = JSON.parse(msg.content);
                        msg.content = decryptor(msg.content, keyPath);
                    });
                    //messages done decrypting
                    fetchMessagesSuccess(dispatch, messages);
                }else{
                    //no messages
                }
            }).catch(msgErr => {

            });
        }).catch(tokenErr => {
            //handle error: unable to fetch token from AsyncStorage
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
                let userArr = keysRes.data.users;
                //check if keys exist in the local file system
                usersArr.forEach(user => {
                    let keyFileName = filePathDir + '/' + user._id + '.pem';
                    RNFS.exists(keyFileName).then(exists => {
                        if(exists){
                            //the key already exists in the local file system, do nothing
                        }else{
                            //the key does not exist and needs to be written in
                            RNFS.writeFile(keyFileName, user.publicKey, 'utf8').then(successWrite => {
                                //key written successfully
                            }).catch(writeErr => {
                                //error saving key
                            });
                        }
                    });
                });
            }).catch(keyErr => {
                //error obtaining key from server
            })
        }).catch(tokenErr => {
            //error readint the auth token from Async Storage (the DB)
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
    })
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
                const receiver = users[0]._id;
                var encryptedMsgJSON = encryptor(content, `${filePathDir}/${receiver}.pem`);
                var encryptedMsg = JSON.stringify(encryptedMsgJSON);
                axios.post(`${host}/api/chat/${conversationID}/message`, {content: encryptedMsg}, config)
                .then(msgSent =>{
                    sendMessageSuccess()
                    //refresh the messages
                }).catch(msgErr =>{
                    //unable to send the message
                });
            }).catch(userErr=>{
                //unable to get the keys and ids from the server
            });
            //encrypt with the public key of the other users
            encryptor(content, )
        }).catch(tokenErr => {
        });
    }
}