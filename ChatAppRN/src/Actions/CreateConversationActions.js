import React from 'react';
import {AsyncStorage, Alert} from 'react-native';
import {host, EMPTY_STR} from '../config';
import axios from 'axios';

import {
    CREATE_CONVERSATION_ATTEMPTING,
    CREATE_CONVERSATION_FAIL,
    CREATE_CONVERSATION_SUCCESS,
    CREATE_CONVERSATION_PHONE_CHANGED
} from './types';

export const createConversationPhoneChanged = (text) =>{
    return{
        type: CREATE_CONVERSATION_PHONE_CHANGED,
        payload: text
    }
}

export const createConversationFail = (dispatch, data) =>{
    dispatch({
        type: CREATE_CONVERSATION_FAIL,
        payload: data
    });
}

export const createConversationSuccess = (dispatch, data) =>{
    dispatch({
        type: CREATE_CONVERSATION_SUCCESS,
        payload: data
    });
}

export const createConversationAttempt= ({phone})=>{
    return(dispatch)=>{
        dispatch({
            type: CREATE_CONVERSATION_ATTEMPTING,
            payload: true
        });
        if(phone === EMPTY_STR){
            createConversationFail(dispatch, 'Enter a valid phone number.');
        }else{
            AsyncStorage.getItem('@CryptoChat:authToken').then(tokenVal => {
                const config = {
                    headers:{
                        authorization: tokenVal
                    }
                }
                const headers = {
                    authorization: tokenVal
                };
                const data = {
                    phone: phone
                }
                axios.post(host + '/api/chat/conversation', data, config).then(res => {
                    //the conversation is successfully saved
                    //will dispatch boolean value of true to client
                    //UI will then receive a notification stating that they successfully registered
                    createConversationSuccess(dispatch, true);
                }).catch(err =>{
                    createConversationFail(dispatch, err.response.data.error);
                });
            }).catch(storeErr => {
                createConversationFail(dispatch, storeErr.error);
            })
        }
    }
}