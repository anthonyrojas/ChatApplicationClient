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

export const openConversation = ({conversationID})=>{
    
}