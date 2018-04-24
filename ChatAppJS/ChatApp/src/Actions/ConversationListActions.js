import axios from 'axios';
import {
    CREATE_CONVERSATION,
    FETCH_CONVERSATIONS_LIST,
    FETCH_CONVERSATIONS_LIST_FAIL,
    FETCH_CONVERSATIONS_LIST_SUCCESS
} from './types';
import {AsyncStorage} from 'react-native';
import {host} from '../config';

export const fetchConversationListFail = (dispatch, text) =>{
    dispatch({
        type: FETCH_CONVERSATIONS_LIST_FAIL,
        payload: text
    });
}

export const fetchConversationListSuccess = (dispatch, data)=>{
    dispatch({
        type: FETCH_CONVERSATIONS_LIST_SUCCESS,
        payload: data.conversations
    });
}

const getToken = async()=>{
    try{
        const authToken = await AsyncStorage.getItem('@CryptoChat:authToken', (err,item)=>{
            return item.toString();
        });
    }catch(error){
        return 'error';
    }
}

export const fetchConversationList = ()=>{
    return(dispatch)=>{
        dispatch({
            type: FETCH_CONVERSATIONS_LIST,
            payload: true
        });
        try{
            //const authToken = await AsyncStorage.getItem('@CryptoChat:authToken');
            //const authToken = getToken();
            AsyncStorage.getItem('@CryptoChat:authToken').then(tokenVal=>{
                const config = {
                    headers:{
                        authorization: tokenVal
                    }
                }
                axios.get(host + '/api/chat/conversations', config).then(res=>{
                    if(!res.data.conversations){
                        fetchConversationListSuccess(dispatch, res);
                    }else{
                        fetchConversationListSuccess(dispatch, res);
                    }
                }).catch(err=>{
                    fetchConversationListFail(dispatch, 'Unable to fetch conversations');
                });
            }).catch(err=>{
                fetchConversationListFail(dispatch, 'Unable to fetch conversations');
            });
        }catch(error){
            fetchConversationListFail(dispatch, 'Unable to fetch conversations');
        }
    }
}