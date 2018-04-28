import React from 'react';
import {AsyncStorage} from 'react-native';
import {host, EMPTY_STR} from '../config';
import axios from 'axios';

import {
    CREATE_CONVERSATION_ATTEMPTING,
    CREATE_CONVERSATION_FAIL,
    CREATE_CONVERSATION_SUCCESS
} from './types';

export const createConversationFail = (dispatch, data) =>{
    dispatch({
        action: CREATE_CONVERSATION_FAIL,
        payload: data
    });
}

export const createConversationSuccess = (dispatch, data) =>{
    dispatch({
        action: CREATE_CONVERSATION_SUCCESS,
        payload: data
    });
}

export const createConversationAttempt= ({phone})=>{
    return(dispatch)=>{
        dispatch({
            type: CREATE_CONVERSATION_ATTEMPTING,
            payload: true
        });
        if(phone === EMPTY_STR || phone == null){
            createConversationFail(dispatch, 'Enter a valid phone number.');
        }else{
            AsyncStorage.getItem('@ChatApp:authToken').then(tokenVal => {
                const config = {
                    headers:{
                        authorization: tokenVal
                    }
                }
                axios.post(host + '/api/chat/conversation', config).then(res => {
                    //the conversation is successfully saved
                    //will dispatch boolean value of true to client
                    //UI will then receive a notification stating that they successfully registered
                    createConversationSuccess();
                }).catch();
            }).catch()
        }
    }
}