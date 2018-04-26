import axios from 'axios';
import {
    CREATE_CONVERSATION,
    FETCH_CONVERSATIONS_LIST,
    FETCH_CONVERSATIONS_LIST_FAIL,
    FETCH_CONVERSATIONS_LIST_SUCCESS,
    TOGGLE_FETCHING_CONVERSATIONS
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
        payload: data
    });
}

export const toggleFetchConversationsPolling = (data)=>{
    return{
        type: TOGGLE_FETCHING_CONVERSATIONS,
        payload: data
    }
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
                        fetchConversationListSuccess(dispatch, []);
                    }else{
                        //const convoList = res.data.conversations[0].chatType;
                        //const convoList = res.data.conversations;
                        AsyncStorage.getItem('@CryptoChat:myPhone').then(phoneVal=>{
                            let convoList = []
                            res.data.conversations.forEach((c)=>{
                                c.title = '';
                                c.participants.forEach(u=>{
                                    if(u.phone != phoneVal){
                                        c.title += `${u.firstName} ${u.lastName} `;
                                    }
                                });
                                convoList.push(c);
                            });
                            fetchConversationListSuccess(dispatch, convoList);
                        }).catch(err=>{
                            fetchConversationListFail(dispatch, 'Unable to fetch conversations');
                        })
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