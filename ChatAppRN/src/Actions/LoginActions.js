import axios from 'axios';
import {AsyncStorage} from 'react-native';
import {host, EMPTY_STR, filePathDir} from '../config';
import {
    LOGIN_CLICKED,
    LOGIN_FAIL,
    LOGIN_PASSWORD_CHANGED,
    LOGIN_PHONE_CHANGED,
    LOGIN_SUCCESS,
    LOGIN_USER,
    LOGIN_SHOW_PASSWORD
} from './types';
import RNFS from 'react-native-fs';

export const loginPhoneChanged = (text)=>{
    return{
        type: LOGIN_PHONE_CHANGED,
        payload: text
    }
}

export const loginShowPassword = (text)=>{
    return{
        type: LOGIN_SHOW_PASSWORD,
        payload: text
    }
}

export const loginPasswordChanged = (text)=>{
    return{
        type: LOGIN_PASSWORD_CHANGED,
        payload: text
    }
}

export const loginFail = (dispatch, errorMsg)=>{
    dispatch({
        type: LOGIN_FAIL,
        payload: errorMsg
    });
}
export const loginSuccess = (dispatch, data)=>{
    dispatch({
        type: LOGIN_SUCCESS,
        payload: {
            token: data.token,
            loggedIn: true
        }
    });
}
const saveToken = async (token)=>{
    try{
        await AsyncStorage.setItem('@CryptoChat:authToken', token);
    }catch(err){
        throw err;
    }
}

const savePhoneNumber = async (phone)=>{
    try{
        await AsyncStorage.setItem('@CryptoChat:myPhone', phone);
    }catch(err){
        throw err;
    }
}

export const loginUser = ({phone, password})=>{
    return (dispatch)=>{
        dispatch({
            type: LOGIN_USER,
            payload: true
        });
        if(phone === EMPTY_STR || password === EMPTY_STR){
            loginFail(dispatch, 'Make sure all fields are filled out!');
        }else{
            const data = {
                phone: phone,
                password: password
            };
            axios.post(host + '/api/login', data).then(async (res)=>{
                try {
                    //AsyncStorage.setItem('@CryptoChat:authToken', res.data.token);
                    await saveToken(res.data.token);
                    await savePhoneNumber(phone);
                    const filePath = filePathDir + '/MyKey/private.pem';
                    //const filePath = RNFS.DocumentDirectoryPath + '/MyKey/private.pem';
                    RNFS.mkdir(filePathDir + '/MyKey').then(mkdirSuccess =>{
                        RNFS.writeFile(filePath, res.data.privateKey, 'utf8').then(success=>{
                            loginSuccess(dispatch, res.data);
                        }).catch(err => {
                            loginFail(dispatch, err.message);
                            //loginFail(dispatch, 'Could not save your private key. Please sign in again');
                        });
                    }).catch(async(mkdirErr) => {
                        loginFail(dispatch, mkdirErr.message);
                    });
                } catch (error) {
                    loginFail(dispatch, error.error);
                    //loginFail(dispatch, 'Could not save your auth token. Please sign in again.');
                }
            }).catch(err=>{
                loginFail(dispatch, err.message);
                //loginFail(dispatch, 'Could not connect to server to sign in. Try again later.');
            });
        }
    }
}