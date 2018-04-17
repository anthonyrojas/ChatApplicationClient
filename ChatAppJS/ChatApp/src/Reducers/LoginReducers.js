import React from 'react';
import {
    LOGIN_CLICKED,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    LOGIN_USER,
    LOGIN_PHONE_CHANGED,
    LOGIN_PASSWORD_CHANGED,
    LOGIN_SHOW_PASSWORD
} from '../Actions/types';

import {EMPTY_STR} from '../config';

const initialState = {
    phone: EMPTY_STR,
    password: EMPTY_STR,
    loggedIn: false,
    loggingIn: EMPTY_STR,
    loginErrorMsg: EMPTY_STR,
    authToken: EMPTY_STR,
    showPassword: false
}

export default (state=initialState, action)=>{
    switch(action.type){
        case LOGIN_PHONE_CHANGED:
            return{
                ...state,
                phone: action.payload
            }
        case LOGIN_PASSWORD_CHANGED:
            return{
                ...state,
                password: action.payload
            }
        case LOGIN_FAIL:
            return{
                ...state,
                loggedIn: false,
                loginErrorMsg: action.payload
            }
        case LOGIN_USER:
            return{
                ...state,
                loggingIn: action.payload,
                loginErrorMsg: EMPTY_STR
            }
        case LOGIN_SUCCESS:
            return{
                ...state,
                loginErrorMsg: EMPTY_STR,
                authToken: action.payload.token,
                loggedIn: true
            }
        case LOGIN_SHOW_PASSWORD:
            return{
                ...state,
                showPassword: action.payload
            }
        default: 
            return state;
    }
}