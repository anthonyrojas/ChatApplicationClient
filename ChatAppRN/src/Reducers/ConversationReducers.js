import React from 'react';
import {
    FETCH_MESSAGES,
    FETCH_MESSAGES_FAIL,
    FETCH_MESSAGES_SUCCESS,
    SEND_MESSAGE,
    SEND_MESSAGE_FAIL,
    SEND_MESSAGE_SUCCESS,
    OPEN_CONVERSATION,
    MESSAGE_CONTENT_CHANGED
} from '../Actions/types';
import {EMPTY_STR} from '../config';

const initialState = {
    messageList: [],
    messageListError: false,
    messageListSuccess: false,
    fetchingMessages: false,
    sendingMessageFailure: false,
    sendingMessageSuccess: false,
    sendingMessage: false,
    loadingConversation: false,
    messageContent: EMPTY_STR
}

export default (state = initialState, action)=>{
    switch(action.type){
        case FETCH_MESSAGES: 
            return{
                ...state,
                fetchingMessages: action.payload,
                messageListError: false,
                messageListSuccess: false
            }
        case FETCH_MESSAGES_FAIL:
            return{
                ...state,
                messageListError: action.payload,
                fetchingMessages: false,
                messageListSuccess: false
            }
        case FETCH_MESSAGES_SUCCESS:
            return{
                ...state,
                messageListSuccess: true,
                messageList: action.payload,
                messageListError: false,
                fetchingMessages: false
            }
        case SEND_MESSAGE:
            return{
                ...state,
                sendingMessage: action.payload,
                sendMessageFailure: false,
                sendingMessageSuccess: false
            }
        case SEND_MESSAGE_FAIL:
            return{
                ...state,
                sendingMessageFailure: action.payload,
                sendingMessageSuccess: false,
                sendingMessage: false
            }
        case SEND_MESSAGE_SUCCESS:
            return{
                ...state,
                sendingMessageSuccess: action.payload,
                sendingMessage: false,
                sendingMessageFailure: false,
                messageContent: EMPTY_STR
            }
        case OPEN_CONVERSATION:
            return{
                ...state,
                loadingConversation: true,
                messageContent: EMPTY_STR
            }
        case MESSAGE_CONTENT_CHANGED:
            return{
                ...state,
                messageContent: action.payload
            }
        default: return state;
    }
}