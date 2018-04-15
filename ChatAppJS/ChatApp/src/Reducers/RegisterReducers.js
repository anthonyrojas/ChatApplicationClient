import React from 'react';
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
} from '../Actions/types';
import {EMPTY_STR} from '../config';

const initialState = {
    firstName: EMPTY_STR,
    lastName: EMPTY_STR,
    phone: EMPTY_STR,
    email: EMPTY_STR,
    password: EMPTY_STR,
    confirmPassword: EMPTY_STR,
    loadingRegister: EMPTY_STR,
    userId: EMPTY_STR,
    registerError: EMPTY_STR
}

export default (state=initialState, action)=>{
    switch(action.type){
        case FIRST_NAME_CHANGED:
            return{
                ...state,
                firstName: action.payload
            }
        case LAST_NAME_CHANGED:
            return{
                ...state,
                lastName: action.payload
            }
        case EMAIL_CHANGED:
            return{
                ...state,
                email: action.payload
            }
        case PHONE_CHANGED: 
            return{
                ...state,
                phone: action.payload
            }
        case PASSWORD_CHANGED:
            return{
                ...state,
                password: action.payload
            }
        case CONFIRM_PASSWORD_CHANGED:
            return{
                ...state,
                confirmPassword: action.payload
            }
        case REGISTER_FAIL:
            return{
                ...state,
                registerError: action.payload,
                password: EMPTY_STR,
                confirmPassword: EMPTY_STR
            }
        case REGISTER_SUCCESS: 
            return{
                ...state,
                userId: action.payload.userId,
                firstName: action.payload.firstName,
                lastName: action.payload.lastName,
                email: action.payload.email,
                phone: action.payload.phone,
                registerError: EMPTY_STR
            }
        case REGISTER_USER: 
            return{
                ...state,
                loadingRegister: action.payload
            }
        default: 
            return state;
    }
}