import {NativeRouter, Route, Link} from 'react-router-native';
import {Component, React} from 'react';
import {StackNavigator} from 'react-navigation';
import Login from './Components/Login';
import Register from './Components/Register';
import Conversations from './Components/Conversations';

export const ChatStack = StackNavigator({
    Conversations: {
        screen: Conversations,
        navigationOptions: {
            headerMode: 'float',
            headerTitle: 'Crypto Chat',
            headerStyle:{
                backgroundColor: '#00FF55'
            },
            headerTitleStyle:{
                color: 'black',
                fontWeight: 'normal',
                fontFamily: 'sans-serif'
            }
        }
    }
});

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
},{headerMode: 'none', title: 'Crypto Chat'});