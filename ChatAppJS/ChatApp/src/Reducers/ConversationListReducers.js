import React from 'react';
import {
    FETCH_CONVERSATIONS_LIST,
    FETCH_CONVERSATIONS_LIST_FAIL,
    FETCH_CONVERSATIONS_LIST_SUCCESS,
    TOGGLE_FETCHING_CONVERSATIONS
} from '../Actions/types';
import {EMPTY_STR} from '../config';

const initialState={
    conversationList: [],
    conversationListError: EMPTY_STR,
    conversationListLoading: false,
    conversationsPolling: true,
}

export default (state=initialState, action)=>{
    switch(action.type){
        case FETCH_CONVERSATIONS_LIST:
            return{
                ...state,
                conversationListLoading: action.payload
            }
        case FETCH_CONVERSATIONS_LIST_SUCCESS:
            return{
                ...state,
                conversationList: action.payload,
                conversationListLoading: false,
                conversationListError: EMPTY_STR
            }
        case FETCH_CONVERSATIONS_LIST_FAIL:
            return{
                ...state,
                conversationList: [],
                conversationListError: action.payload,
                conversationListLoading: false
            }
        case TOGGLE_FETCHING_CONVERSATIONS:{
            return{
                ...state,
                conversationsPolling: action.payload
            }
        }
        default:
            return state;
    }
}