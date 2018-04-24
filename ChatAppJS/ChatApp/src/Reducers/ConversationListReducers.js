import React from 'react';
import {
    FETCH_CONVERSATIONS_LIST,
    FETCH_CONVERSATIONS_LIST_FAIL,
    FETCH_CONVERSATIONS_LIST_SUCCESS
} from '../Actions/types';
import {EMPTY_STR} from '../config';

const initialState={
    conversationList: null,
    conversationListError: EMPTY_STR,
    conversationListLoading: false,
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
                conversationList: null,
                conversationListError: action.payload,
                conversationListLoading: false
            }
        default:
            return state;
    }
}