import React from 'react';
import {host} from '../config';
import axios from 'axios';
import RNFS from 'react-native-fs';
import {
    FIRST_NAME_CHANGED,
    LAST_NAME_CHANGED,
    EMAIL_CHANGED,
    PHONE_CHANGED,
    PASSWORD_CHANGED,
    CONFIRM_PASSWORD_CHANGED,
    REGISTER_USER,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    REGISTER_CLICK
} from './types';

export const firstNameChanged = (text)=>{
    return{
        type: FIRST_NAME_CHANGED,
        payload: text
    }
}

export const lastNameChanged = (text) =>{
    return{
        type: LAST_NAME_CHANGED,
        payload: text
    }
}

export const emailChanged = (text)=>{
    return{
        type: EMAIL_CHANGED,
        payload: text
    }
}

export const phoneChanged = (text)=>{
    return{
        type: PHONE_CHANGED,
        payload: text
    }
}

export const passwordChanged = (text)=>{
    return{
        type: PASSWORD_CHANGED,
        payload: text
    }
}

export const confirmPasswordChanged = (text)=>{
    return{
        type: CONFIRM_PASSWORD_CHANGED,
        payload: text
    }
}

export const registerFail = (dispatch, errorMsg)=>{
    dispatch({
        type: REGISTER_FAIL,
        payload: errorMsg
    })
}

export const registerSuccess = (dispatch, data)=>{
    dispatch({
        type: REGISTER_SUCCESS,
        payload: {
            userId: data.user._id,
            firstName: data.user.firstName,
            lastName: data.user.lastName,
            email: data.user.email,
            phone: data.user.phone
        }
    })
}

export const registerUser = ({firstName, lastName, phone, email, password, confirmPassword})=>{
    return(dispatch)=>{
        dispatch({
            type: REGISTER_USER,
            payload: 'Registering, please wait.'
        });
        const data = {
            firstName: firstName,
            lastName: lastName,
            phone: phone,
            email: email,
            password: password,
            confirmPassword: confirmPassword
        };
        axios.post(host + '/register', data ).then(res=>{
            const filePath = RNFS.DocumentDirectoryPath + '/MyKey/private.pem';
            RNFS.writeFile(path, res.data.privateKey, 'utf-8').then(success=>{
                //success message when registered and the key has been written to device
                registerSuccess(dispatch, res.data);
            }).catch(fileErr=>{
                //error when unable to successfully write the private key
                registerFail(dispatch, 'Unable to save your private key. Please contact us for help.');
            });
        }).catch(error=>{
            registerFail(dispatch, 'Unable to register. Could not connect to server.');
        });
    }
}