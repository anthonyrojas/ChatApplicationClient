import React from 'react';
import {
    CREATE_CONVERSATION_ATTEMPTING,
    CREATE_CONVERSATION_FAIL,
    CREATE_CONVERSATION_SUCCESS,
    CREATE_CONVERSATION_PHONE_CHANGED
} from '../Actions/types';
import {EMPTY_STR} from '../config';

const initialState={
    creatingConversation: false,
    creatingConversationError: EMPTY_STR,
    creatingConversationFailed: false,
    creatingConversationSuccessful: false,
    conversationPhone: EMPTY_STR
}

export default (state=initialState, action)=>{
    switch(action.type){
        case CREATE_CONVERSATION_ATTEMPTING:
            return{
                ...state,
                creatingConversation: true
            }
        case CREATE_CONVERSATION_SUCCESS: 
            return{
                ...state,
                creatingConversationSuccessful: true,
                creatingConversation: false,
            }
        case CREATE_CONVERSATION_FAIL:
            return{
                ...state,
                creatingConversation: false,
                creatingConversationError: action.payload,
                creatingConversationFailed: true
            }
        case CREATE_CONVERSATION_PHONE_CHANGED:
            return {
                ...state,
                conversationPhone: action.payload
            }
        default: return state;
    }
}