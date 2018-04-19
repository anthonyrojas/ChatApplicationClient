import {NativeRouter, Route, Link} from 'react-router-native';
import {Component, React} from 'react';
import {StackNavigator} from 'react-navigation';
import Login from './Components/Login';
import Register from './Components/Register';
import Conversations from './Components/Conversations';

export const Routes = StackNavigator({
    Login: {
        screen: Login
    },
    Register: {
        screen: Register
    },
    Conversations: {
        screen: ChatStack
    }
},{headerMode: 'none'});

export const ChatStack = StackNavigator({
    Conversations: {
        screen: Conversations
    }
},{
    title: 'Crypto Chat'
});