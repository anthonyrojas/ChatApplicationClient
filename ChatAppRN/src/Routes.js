import {Component, React} from 'react';
import {StackNavigator} from 'react-navigation';
import Login from './Components/Login';
import Register from './Components/Register';
import Conversations from './Components/Conversations';
import CreateConversation from './Components/CreateConversation';

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
                fontWeight: 'bold',
                fontFamily: 'sans-serif'
            }
        }
    },
    CreateConversation:{
        screen: CreateConversation,
        navigationOptions: {
            headerMode: 'float',
            headerTitle: 'Start A Conversation...',
            headerStyle:{
                backgroundColor: '#00FF55'
            },
            headerTitleStyle:{
                color: 'black',
                fontWeight: 'bold',
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