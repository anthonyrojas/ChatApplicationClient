import axios from 'axios';
import {
    CREATE_CONVERSATION, 
    FETCH_CONVERSATION_FAIL, 
    FETCH_CONVERSATIONS, 
    FETCH_CONVERSATIONS_SUCCESS
} from './types';
import {AsyncStorage} from 'react-native';