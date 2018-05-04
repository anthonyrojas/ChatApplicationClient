import axios from 'axios';
import React from 'react';
import RNFS from 'react-native-fs';
import {AsyncStorage} from 'react-native';
import {host, EMPTY_STR, filePathDir} from '../config';
import {
    OPEN_CONVERSATION,
    FETCH_MESSAGES,
    FETCH_MESSAGES_FAIL,
    FETCH_MESSAGES_SUCCESS
} from './types';
import {
    encryptor,
    decryptor
} from '../cryptoFunctions';

export const fetchMessages = ({conversationID}) =>{
    return (dispatch)=>{
        dispatch({
            type: FETCH_MESSAGES,
            payload: true
        });
        AsyncStorage.getItem('@CryptoChat:authToken').then(tokenData => {
            //successfully fetched token from AsyncStorage
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